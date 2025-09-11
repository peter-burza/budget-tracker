'use client'

import { TrType } from "@/enums"
import { Transaction } from "@/interfaces"
import { CURRENCIES } from "@/utils"
import { useMemo, useState } from "react"

interface SummaryDetailsProps {
    type: TrType
    dateFilteredTransactions: Transaction[]
    isOpen: boolean
}

const SummaryDetails: React.FC<SummaryDetailsProps> = ({ type, dateFilteredTransactions, isOpen }) => {
    const currencyIncomes = useMemo(() => {
        const transactions = dateFilteredTransactions.filter(t => t.type === type)
        const currencyMap: Record<string, number> = {}

        transactions.forEach(t => {
            const currency = t.currency.code
            if (!currencyMap[currency]) {
                currencyMap[currency] = 0
            }
            currencyMap[currency] += t.origAmount
        })

        return Object.entries(currencyMap).map(([currency, amount]) => {
            return {
                currency: currency,
                amount: amount
            }
        })

    }, [dateFilteredTransactions])
    return isOpen &&
        (
            type === TrType.Income ?
                (
                    <div className="flex flex-col gap-1 items-end bg-[var(--color-list-bg-green)] text-green-200 p-1 mb-1 px-3 border-1 border-[var(--color-dark-blue)]">
                        {
                            currencyIncomes.map((c, idx) => {
                                return (
                                    <div key={idx} >{c.amount}{"  "}{CURRENCIES[c.currency].symbol}</div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="flex flex-col gap-1 w-full items-end bg-[var(--color-list-bg-red)] text-red-200 p-1 mb-1 px-3 border-1 border-[var(--color-dark-blue)]">
                        {
                            currencyIncomes.map((c) => {
                                return (
                                    <div>{c.amount}{"  "}{CURRENCIES[c.currency].symbol}</div>
                                )
                            })
                        }
                    </div>
                )
        )
}

export default SummaryDetails