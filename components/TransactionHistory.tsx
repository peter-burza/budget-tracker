'use state'

import React, { useEffect, useMemo, useState } from "react";
import List, { sortDateNewestFirst } from "./List"
import Summary from "./Summary"
import { calculateTotal, getMonth, getMonthName, getMonthNumber, getYear, getYearsFromTransactions } from "@/app/utils";
import { Transaction } from "@/app/interfaces/Transaction";
import { JSX } from "@emotion/react/jsx-runtime";
import ExpenseBreakdown from "./ExpenseBreakdown";

interface TransactionHistoryPtops {
    transactions: Transaction[]
    currency: JSX.Element
    deleteTransaction: (transaction: Transaction) => void
    screenWidth: number
}

const OVERALL = 'overall';

const TransactionHistory: React.FC<TransactionHistoryPtops> = ({ transactions, currency, deleteTransaction, screenWidth }) => {
    // Latest record info
    const latest = useMemo(() => sortDateNewestFirst(transactions)[0], [transactions]);
    const latestMonthRecord = useMemo(() => getMonthName(latest?.date.slice(5, 7) ?? '01'), [latest]);
    const latestYearRecord = useMemo(() => latest?.date.slice(0, 4) ?? '1970', [latest]);

    const [selectedMonth, setSelectedMonth] = useState<string>(latestMonthRecord.toLowerCase());
    const [selectedYear, setSelectedYear] = useState<string>(latestYearRecord);

    const [resetSignal, setResetSignal] = useState<number>(0)

    // Years list once
    const years = useMemo(() => [OVERALL, ...getYearsFromTransactions(transactions).sort((a, b) => Number(b) - Number(a))], [transactions]);

    function triggerReset() {
        setResetSignal(() => resetSignal + 1)
    }

    const dateFilteredTransactions = useMemo(() => {
        let list = transactions;

        // Year
        if (selectedYear !== OVERALL) {
            list = list.filter((t) => getYear(t.date) === selectedYear);
        }

        // Month (selectedMonth is 'overall' or full lowercase month name)
        if (selectedMonth !== OVERALL) {
            const monthNum = getMonthNumber(selectedMonth); // returns '01'..'12'
            list = list.filter((t) => getMonth(t.date) === monthNum);
        }

        return list
    }, [selectedYear, selectedMonth, transactions])

    const totalExpense = useMemo(() => {
        return calculateTotal("-", dateFilteredTransactions)
    }, [dateFilteredTransactions])

    useEffect(() => {
        setSelectedMonth(latestMonthRecord.toLowerCase());
        setSelectedYear(latestYearRecord);
    }, [resetSignal])

    return (
        <div className="flex flex-col items-center gap-5 bg-[var(--bckground-muted)] rounded-md p-3">
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
            <List
                currency={currency}
                dateFilteredTransactions={dateFilteredTransactions}
                deleteTransaction={deleteTransaction}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                resetSignal={resetSignal}
                screenWidth={screenWidth}
            />
            <hr className="text-[var(--color-dark-blue)] w-[85%]" />
            <Summary
                dateFilteredTransactions={dateFilteredTransactions}
                latestMonthRecord={latestMonthRecord}
                latestYearRecord={latestYearRecord}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                currency={currency}
                totalExpense={totalExpense}
            />
            <hr className="text-[var(--color-dark-blue)] w-[85%]" />
            <ExpenseBreakdown
                dateFilteredTransactions={dateFilteredTransactions}
                screenWidth={screenWidth}
                currency={currency}
                totalExpense={totalExpense}
            />
        </div>
    )
}

export default TransactionHistory