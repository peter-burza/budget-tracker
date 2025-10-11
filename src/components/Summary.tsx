'use client'

import { Transaction } from "@/interfaces"
import { TrType } from '@/enums'
import { calculateTotalSimplier, handleToggle, hasMultipleCurrencies, roundToTwo } from "@/utils"
import React, { useEffect, useState } from "react"
import Modal from "./Modal"
import { useCurrencyStore } from "@/context/CurrencyState"
import SummaryDetails from "./SummaryDetails"

interface SummaryProps {
    dateFilteredTransactions: Transaction[]
    incomeFilteredTransactions: Transaction[]
    expenseFilteredTransactions: Transaction[]
    totalExpense: number
    isLoading: boolean
    displayAmount: (amount: number, rate?: number) => string
}

function calculateNetBalance(totalIncome: number, totalExpense: number): number {
    return Math.abs(totalIncome - totalExpense)
}

const Summary: React.FC<SummaryProps> = ({ dateFilteredTransactions, totalExpense, isLoading, displayAmount, incomeFilteredTransactions, expenseFilteredTransactions }) => {
    const baseCurrency = useCurrencyStore(state => state.baseCurrency)
    const selectedCurrency = useCurrencyStore(state => state.selectedCurrency)
    const convertGlobalFunc = useCurrencyStore(state => state.convertGlobalFunc)

    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [showIncomeDetails, setShowIncomeDetails] = useState<boolean>(false)
    const [showExpenseDetails, setShowExpenseDetails] = useState<boolean>(false)
    const [totalIncome, setTotalIncome] = useState<number>(0)
    const [multipleIncomeCurrencies, setMultipleIncomeCurrencies] = useState<boolean>(false)
    const [multipleExpenseCurrencies, setMultipleExpenseCurrencies] = useState<boolean>(false)

    const netBalance = calculateNetBalance(totalIncome, totalExpense)


    function toggleShowInfo() {
        setShowInfo(!showInfo)
    }

    function toggleShowIncomeDetails() {
        if (totalIncome != 0 && multipleIncomeCurrencies) setShowIncomeDetails(!showIncomeDetails)
    }

    function toggleShowExpenseDetails() {
        if (totalExpense != 0 && multipleExpenseCurrencies) setShowExpenseDetails(!showExpenseDetails)
    }


    // TotalIncome calculation
    useEffect(() => {
        const convertedTrAmountsPromises = incomeFilteredTransactions.map((t) => {
            return baseCurrency.code === selectedCurrency.code
                ? Promise.resolve(t.baseAmount)
                : t.currency.code === selectedCurrency.code
                    ? Promise.resolve(t.origAmount)
                    : convertGlobalFunc(t.currency.code, selectedCurrency.code, t.origAmount)
        })

        Promise.all(convertedTrAmountsPromises).then((resolvedAmounts) => {
            const total = calculateTotalSimplier(resolvedAmounts)
            setTotalIncome(roundToTwo(total))
        })
        // calculateTotal(TrType.Income, dateFilteredTransactions, setTotalIncome, baseCurrency.code, selectedCurrency.code)
    }, [incomeFilteredTransactions, selectedCurrency])

    useEffect(() => {
        if (hasMultipleCurrencies(incomeFilteredTransactions)) setMultipleIncomeCurrencies(true)
        else setMultipleIncomeCurrencies(false)
        if (showIncomeDetails)
            toggleShowIncomeDetails()
    }, [incomeFilteredTransactions])

    useEffect(() => {
        if (hasMultipleCurrencies(expenseFilteredTransactions)) setMultipleExpenseCurrencies(true)
        else setMultipleExpenseCurrencies(false)
        if (showExpenseDetails)
            toggleShowExpenseDetails()
    }, [expenseFilteredTransactions])


    return (
        <div id="summary" className="flex flex-col items-center gap-2 w-full max-w-108">

            <Modal onClose={toggleShowInfo} isOpen={showInfo}>
                <h3>Summary</h3 >
                <ul className="flex flex-col gap-1 items-start">
                    <li className='p-1.5'>1. Basic info of the selected period.</li>
                    <li className='p-1.5'>2. Click on the Income/Expense bar to show each currency summary separatly.</li>
                </ul >
            </Modal >

            <div className='flex gap-2 items-center'>
                <h4>Summary</h4>
                <i onClick={() => { handleToggle(showInfo, setShowInfo) }} className="fa-solid fa-circle-info clickable duration-200 text-sky-300"></i>
            </div>
            <div id="basic-summary-info" className={`flex flex-col w-full justify-between gap-0.25 ${isLoading && 'opacity-50 duration-200'}`}>

                <div onClick={toggleShowIncomeDetails} className={`flex gap-2 w-full items-center justify-between bg-[var(--color-list-bg-green)] text-green-200 p-1 px-3 border-1 border-[var(--color-dark-blue)] ${(totalIncome > 0 && multipleIncomeCurrencies) && 'clickable'}`}>
                    <h4>Income:</h4>
                    <div className="flex gap-2">
                        <h4>{totalIncome}</h4>
                        <h4 className="flex items-center">{selectedCurrency.symbol}</h4>
                    </div>
                </div>
                <SummaryDetails
                    type={TrType.Income}
                    dateFilteredTransactions={dateFilteredTransactions}
                    isOpen={showIncomeDetails}
                />

                <div onClick={toggleShowExpenseDetails} className={`flex gap-2 w-full items-center justify-between bg-[var(--color-list-bg-red)] text-red-200 p-1 px-3 border-1 border-[var(--color-dark-blue)] ${(totalExpense > 0 && multipleExpenseCurrencies) && 'clickable'}`}>
                    <h4>Expense:</h4>
                    <div className="flex gap-2">
                        <h4>- {totalExpense}</h4>
                        <h4 className="flex items-center">{selectedCurrency.symbol}</h4>
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
                        <h5 className="flex items-center">{selectedCurrency.symbol}</h5>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Summary