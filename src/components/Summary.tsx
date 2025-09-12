'use client'

import { Transaction } from "@/interfaces"
import { TrType } from '@/enums'
import { calculateTotal, calculateTotalSimplier, CURRENCIES, handleToggle } from "@/utils"
import React, { useMemo, useState } from "react"
import Modal from "./Modal"
import { Currency } from "@/types"
import { useCurrencyStore } from "@/context/CurrencyState"
import SummaryDetails from "./SummaryDetails"

interface SummaryProps {
    dateFilteredTransactions: Transaction[]
    totalExpense: number
    isLoading: boolean
    displayAmount: (amount: number, rate?: number) => string
}

function calculateNetBalance(totalIncome: number, totalExpense: number): number {
    return Math.abs(totalIncome - totalExpense)
}

export function getMostUsedCurrency(transactions: Transaction[], baseCurrency: Currency) {
    const frequencyMap: Record<string, number> = {}

    for (const tx of transactions) {
        const currencyCode = tx.currency?.code

        if (!currencyCode) continue
        frequencyMap[currencyCode] = (frequencyMap[currencyCode] || 0) + 1
    }

    let mostUsedCurr: Currency = baseCurrency
    let maxCount = 0

    for (const [code, count] of Object.entries(frequencyMap)) {
        if (count > maxCount) {
            mostUsedCurr = CURRENCIES[code]
            maxCount = count
        }
    }

    return mostUsedCurr
}


const Summary: React.FC<SummaryProps> = ({ dateFilteredTransactions, totalExpense, isLoading, displayAmount }) => {
    const baseCurrency = useCurrencyStore(state => state.baseCurrency)
    const selectedCurrency = useCurrencyStore(state => state.selectedCurrency)
    const convertGlobalFunc = useCurrencyStore(state => state.convertGlobalFunc)
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [showIncomeDetails, setShowIncomeDetails] = useState<boolean>(false)
    const [showExpenseDetails, setShowExpenseDetails] = useState<boolean>(false)

    const totalIncome = useMemo(() => {
        const convertedTrAmounts = dateFilteredTransactions.map((t) => {
            return (
                baseCurrency === selectedCurrency
                    ? t.baseAmount
                    : t.currency === selectedCurrency
                        ? t.origAmount
                        : convertGlobalFunc(t.currency.code, selectedCurrency.code, t.origAmount)
            )
        })

        const calculatedTotal = calculateTotalSimplier(TrType.Income, convertedTrAmounts)
        return calculatedTotal
    }, [dateFilteredTransactions])

    const netBalance = calculateNetBalance(totalIncome, totalExpense)

    // const mostUsedCurrency = useMemo(() => {
    //     return getMostUsedCurrency(dateFilteredTransactions, baseCurrency)
    // }, [dateFilteredTransactions])

    function toggleShowInfo() {
        setShowInfo(!showInfo)
    }

    function toggleShowDetails(type: TrType) {
        if (type === TrType.Income) setShowIncomeDetails(!showIncomeDetails)
        else setShowExpenseDetails(!showExpenseDetails)
    }


    return (
        <div id="summary" className="flex flex-col items-center gap-2 w-full">

            <Modal onClose={toggleShowInfo} isOpen={showInfo}>
                <h3>Summary</h3 >
                <ul className="flex flex-col gap-2">
                    <li className='p-1.5'>Basic info of the selected period.</li>
                </ul >
            </Modal >

            <div className='flex gap-2 items-center'>
                <h4>Summary</h4>
                <i onClick={() => { handleToggle(showInfo, setShowInfo) }} className="fa-solid fa-circle-info clickable duration-200 text-sky-300"></i>
            </div>
            <div id="basic-summary-info" className={`flex flex-col w-full justify-between gap-0.25 ${isLoading && 'opacity-50 duration-200'}`}>

                <div onClick={() => toggleShowDetails(TrType.Income)} className="flex gap-2 w-full items-center justify-between bg-[var(--color-list-bg-green)] text-green-200 p-1 px-3 border-1 border-[var(--color-dark-blue)] clickable">
                    <h4>Income:</h4>
                    <div className="flex gap-2">
                        <h4>{displayAmount(totalIncome)}</h4>
                        <h4 className="flex items-center">{baseCurrency.symbol}</h4>
                    </div>
                </div>
                <SummaryDetails
                    type={TrType.Income}
                    dateFilteredTransactions={dateFilteredTransactions}
                    isOpen={showIncomeDetails}
                />

                <div onClick={() => toggleShowDetails(TrType.Expense)} className="flex gap-2 w-full items-center justify-between bg-[var(--color-list-bg-red)] text-red-200 p-1 px-3 border-1 border-[var(--color-dark-blue)] clickable">
                    <h4>Expense:</h4>
                    <div className="flex gap-2">
                        <h4>- {displayAmount(totalExpense)}</h4>
                        <h4 className="flex items-center">{baseCurrency.symbol}</h4>
                    </div>
                </div>
                <SummaryDetails
                    type={TrType.Expense}
                    dateFilteredTransactions={dateFilteredTransactions}
                    isOpen={showExpenseDetails}
                />

                <div className="flex gap-2 w-full items-center justify-between bg-sky-800 text-sky-200 p-1 px-3 border-1 border-[var(--color-dark-blue)]">
                    <h5>Net Balance:</h5>
                    <div className="flex items-center gap-2">
                        <h5>{totalExpense > totalIncome && '- '} {displayAmount(netBalance)}</h5>
                        <h5 className="flex items-center">{baseCurrency.symbol}</h5>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Summary