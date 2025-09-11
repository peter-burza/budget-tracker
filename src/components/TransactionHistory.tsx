'use state'

import React, { useEffect, useMemo, useState } from "react"
import List, { sortDateNewestFirst } from "./List"
import Summary, { fancyNumber } from "./Summary"
import { calculateTotal, CategoryIcons, getMonth, getMonthName, getMonthNumber, getYear, getYearsFromTransactions, roundToTwo } from "@/utils"
import { Transaction } from "@/interfaces"
import { Category} from '@/enums'
import { TrType } from '@/enums'
import { JSX } from "@emotion/react/jsx-runtime"
import ExpenseBreakdown from "./ExpenseBreakdown"
import { Currency } from "@/types"
import { useCurrencyStore } from "@/context/CurrencyState"
// import { useTransactions } from "../context/TransactionsContext"

interface TransactionHistoryPtops {
    transactions: Transaction[]
    selectedCurrency: Currency
    deleteTransaction: (deleteTrId: string | undefined) => void
    screenWidth: number
    isLoading: boolean
}

const OVERALL = 'overall'

const TransactionHistory: React.FC<TransactionHistoryPtops> = ({ transactions, selectedCurrency, deleteTransaction, screenWidth, isLoading }) => {
    // const { transactions } = useTransactions()
    const baseCurrency = useCurrencyStore(state => state.baseCurrency)

    const convert = useCurrencyStore((state) => state.convert)

    const [selectedMonth, setSelectedMonth] = useState<string>("")
    const [selectedYear, setSelectedYear] = useState<string>("")
    const [resetSignal, setResetSignal] = useState<number>(0)

    // Years list once
    const years = useMemo(() => [OVERALL, ...getYearsFromTransactions(transactions).sort((a, b) => Number(b) - Number(a))], [transactions])

    const dateFilteredTransactions = useMemo(() => {
        if (transactions.length === 0 || selectedMonth == "" || selectedYear == "") return []
        let list = transactions

        // Year
        if (selectedYear !== OVERALL) {
            list = list.filter((t) => getYear(t.date) === selectedYear)
        }

        // Month (selectedMonth is 'overall' or full lowercase month name)
        if (selectedMonth !== OVERALL) {
            const monthNum = getMonthNumber(selectedMonth) // returns '01'..'12'
            list = list.filter((t) => getMonth(t.date) === monthNum)
        }

        return list
    }, [selectedYear, selectedMonth, transactions])

    const totalExpense = useMemo(() => {
        return calculateTotal(TrType.Expense, dateFilteredTransactions)
    }, [dateFilteredTransactions])


    function triggerReset() {
        setResetSignal(() => resetSignal + 1)
    }

    function displayCategory(category: Category): string | JSX.Element {
        return screenWidth > 510 ? category : CategoryIcons[category]
    }

    function convertAmount(amount: number, currency: Currency) {
        const convertedAmount = roundToTwo(convert(amount, currency))
        return convertedAmount
    }

    function displayAmount(amount: number, currency: Currency) {
        const convertedAmount = currency === baseCurrency ? amount : convertAmount(amount, currency)
        const fanciedAmount = fancyNumber(convertedAmount)
        return fanciedAmount
    }


    useEffect(() => { // to ensure that when the page is loaded and all data are fetched, the filter will set te latest Transaction date
        if (transactions.length === 0 || (selectedMonth !== "" && selectedYear !== "")) return

        const latest = sortDateNewestFirst(transactions)[0]
        const month = getMonthName(latest?.date.slice(5, 7) ?? '01').toLowerCase()
        const year = latest?.date.slice(0, 4) ?? '1970'

        setSelectedMonth(month)
        setSelectedYear(year)
    }, [transactions])

    useEffect(() => { // to ensure set Latest Transaction date after reset button is hitten
        if (transactions.length === 0) return

        const latest = sortDateNewestFirst(transactions)[0]
        const month = getMonthName(latest?.date.slice(5, 7) ?? '01').toLowerCase()
        const year = latest?.date.slice(0, 4) ?? '1970'

        setSelectedMonth(month)
        setSelectedYear(year)
    }, [resetSignal])

    
    return (
        <div id="transactions-history" className="base-container">
            <h3>Transactions History</h3>
            <div className="flex justify-between gap-3 sm:gap-6">
                <div className="flex flex-wrap gap-2">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="max-h-7.5 !p-1"
                        name="year-selection"
                        id="year-selection"
                    >
                        {years.map((year, idx) => (
                            <option key={idx} value={year}>
                                {year === OVERALL ? 'Overall' : year}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="max-h-7.5 !p-1"
                        name="month-selection"
                        id="month-selection"
                    >
                        <option value={OVERALL}>Overall</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                </div>

                <div
                    onClick={triggerReset}
                    className="flex justify-center bg-[var(--color-dark-blue)] py-[8px] px-[6px] rounded-full duration-200 hover:rotate-180 cursor-pointer"
                >
                    <i title="Reset filters" className="fa-solid fa-rotate"></i>
                </div>
            </div>
            <Summary
                dateFilteredTransactions={dateFilteredTransactions}
                // selectedCurrency={selectedCurrency}
                totalExpense={totalExpense}
                isLoading={isLoading}
                displayAmount={displayAmount}
            />
            <hr className="text-[var(--color-dark-blue)] w-[85%]" />
            <List
                // selectedCurrency={selectedCurrency}
                dateFilteredTransactions={dateFilteredTransactions}
                deleteTransaction={deleteTransaction}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                resetSignal={resetSignal}
                screenWidth={screenWidth}
                displayCategory={displayCategory}
                isLoading={isLoading}
                // displayAmount={displayAmount}
            />
            <hr className="text-[var(--color-dark-blue)] w-[85%]" />
            <ExpenseBreakdown
                dateFilteredTransactions={dateFilteredTransactions}
                screenWidth={screenWidth}
                selectedCurrency={selectedCurrency}
                totalExpense={totalExpense}
                displayCategory={displayCategory}
                isLoading={isLoading}
                displayAmount={displayAmount}
            />
        </div>
    )
}

export default TransactionHistory