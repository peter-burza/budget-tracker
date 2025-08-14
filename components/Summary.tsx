'use client'

import { Transaction } from "@/app/interfaces/Transaction";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { useMemo } from "react";

interface SummaryProps {
    dateFilteredTransactions: Transaction[]
    latestMonthRecord: string;
    latestYearRecord: string
    selectedMonth: string
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>
    selectedYear: string
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>
    currency: JSX.Element
}

function calculateTotal(type: string, transactions: Transaction[]): number {
    const onlyIncomeTransactions = transactions.filter(t => (t.type === type))
    const types = onlyIncomeTransactions.map(t => t.amount)
    const totaltype = types.reduce((sum, t) => sum + t, 0)
    return totaltype
}

function calculateNetBalance(totalIncome: number, totalExpense: number): number {
    return Math.abs(totalIncome - totalExpense)
}

function fancyNumber(num: number): string {
    return num.toLocaleString()
}

const Summary: React.FC<SummaryProps> = ({ dateFilteredTransactions, currency }) => {
    const totalIncome = useMemo(() => {
        return calculateTotal("+", dateFilteredTransactions)
    }, [dateFilteredTransactions])
    const totalExpense = useMemo(() => {
        return calculateTotal("-", dateFilteredTransactions)
    }, [dateFilteredTransactions])

    return (
        <div id="summary" className="flex flex-col items-center gap-4 w-full">
            <h3>Summary</h3>
            <div className="flex justify-between gap-2">
                <div id="basic-summary-info" className="flex flex-col gap-[8px]">
                    <div className="flex gap-2 items-center">
                        <h4>Income:</h4>
                        <div className="flex">
                            <h4>{fancyNumber(totalIncome)}</h4>
                            <h4 className="-mt-[0.15rem]">{currency}</h4>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h4>Expence:</h4>
                        <div className="flex">
                            <h4>- {fancyNumber(totalExpense)}</h4>
                            <h4 className="-mt-[0.15rem]">{currency}</h4>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h5>Net Balance:</h5>
                        <div className="flex">
                            <h5>{totalExpense > totalIncome && '- '} {fancyNumber(calculateNetBalance(totalIncome, totalExpense))}</h5>
                            <h5 className="-mt-[0.15rem]">{currency}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary