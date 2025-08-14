'use client';

import { JSX } from '@emotion/react/jsx-runtime';
import React, { useEffect, useMemo, useState } from 'react';
import TransactionCard from './TransactionCard';
import { Category, Transaction } from '@/app/interfaces/Transaction';
import { getMonth, getMonthName, getMonthNumber, getYear, getYearsFromTransactions } from '@/app/utils';

interface ListProps {
    currency: JSX.Element;
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

export type TableHeadKey = 'd' | 't' | 'a' | 'c';

const OVERALL = 'overall';

function sortDateNewestFirst(list: Transaction[]): Transaction[] {
    return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
function sortDateOldestFirst(list: Transaction[]): Transaction[] {
    return [...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
function sortAmountHighFirst(list: Transaction[]): Transaction[] {
    return [...list].sort((a, b) => b.amount - a.amount);
}
function sortAmountLowFirst(list: Transaction[]): Transaction[] {
    return [...list].sort((a, b) => a.amount - b.amount);
}

const List: React.FC<ListProps> = ({ currency, transactions, setTransactions }) => {
    // Latest record info
    const latest = useMemo(() => sortDateNewestFirst(transactions)[0], [transactions]);
    const latestMonthRecord = useMemo(() => getMonthName(latest?.date.slice(5, 7) ?? '01'), [latest]);
    const latestYearRecord = useMemo(() => latest?.date.slice(0, 4) ?? '1970', [latest]);

    // Filters and sorting state
    const [selectedMonth, setSelectedMonth] = useState<string>(latestMonthRecord.toLowerCase()); // 'january' | 'overall'
    const [selectedYear, setSelectedYear] = useState<string>(latestYearRecord); // '2025' | 'overall'
    const [typeFilter, setTypeFilter] = useState<boolean | null>(null); // true = '+', false = '-', null = all
    const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);

    // Sorting toggles: dateAscending can be true/false/null (null = inactive), same for amountDescending
    const [dateAscending, setDateAscending] = useState<boolean | null>(false);
    const [amountDescending, setAmountDescending] = useState<boolean | null>(null);

    // UI state
    const [screenWidth, setScreenWidth] = useState(0);
    const [tableHeads, setTableHeads] = useState<Record<TableHeadKey, JSX.Element | string>>({ d: '', t: '', a: '', c: '', });
    const [transactionCount, setTransactionCount] = useState<number>(10);

    // Derived list (single source of truth)
    const filteredAndSortedTList = useMemo(() => {
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

        // Category
        if (categoryFilter !== null) {
            list = list.filter((t) => t.category === categoryFilter);
        }

        // Type
        if (typeFilter !== null) {
            list = list.filter((t) => (typeFilter ? t.type === '+' : t.type === '-'));
        }

        // Sorting (only one active at a time; if both null, keep natural order)
        if (dateAscending !== null) {
            list = dateAscending ? sortDateOldestFirst(list) : sortDateNewestFirst(list);
        } else if (amountDescending !== null) {
            list = amountDescending ? sortAmountHighFirst(list) : sortAmountLowFirst(list);
        } else {
            // default stable order: newest first
            list = sortDateNewestFirst(list);
        }

        return list;
    }, [
        transactions,
        selectedYear,
        selectedMonth,
        categoryFilter,
        typeFilter,
        dateAscending,
        amountDescending,
    ]);

    // Handlers
    function setTypeFilterToggle() {
        setTypeFilter((prev) => (prev === null ? true : prev === true ? false : null));
    }

    function setDateReorder(): void {
        setAmountDescending(null);
        setDateAscending((prev) => (prev === false ? true : false));
    }

    function setAmountReorder(): void {
        setDateAscending(null);
        setAmountDescending((prev) => (prev === true ? false : true));
    }

    function resetFilters() {
        setSelectedMonth(latestMonthRecord.toLowerCase());
        setSelectedYear(latestYearRecord);
        setCategoryFilter(null);
        setTypeFilter(null);
        setDateAscending(false);
        setAmountDescending(null);
        setTableHeads((prev) => ({
            ...prev,
            c: screenWidth > 510 ? 'Category' : <i className="fa-solid fa-icons text-base"></i>,
        }));
        setTransactionCount(10);
    }
    
    function deleteTransaction(deleteTransaction: Transaction):void {
        const updatedTransactions: Transaction[] = transactions.filter(t => (t.id !== deleteTransaction.id))
        setTransactions(updatedTransactions)
    }

    // Screen size
    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Table heads
    useEffect(() => {
        if (screenWidth < 510) {
            setTableHeads({
                d: <i className="fa-solid fa-calendar-days text-base"></i>,
                t: (
                    <>
                        <i className="fa-solid fa-arrow-down-up-across-line"></i>
                    </>
                ),
                a: currency,
                c: <i className="fa-solid fa-icons text-base"></i>,
            });
        } else {
            setTableHeads({ d: 'Date', t: 'Type', a: 'Amount', c: 'Category' });
        }
    }, [screenWidth, currency]);

    // Years list once
    const years = useMemo(() => [OVERALL, ...getYearsFromTransactions(transactions).sort((a, b) => Number(b) - Number(a))], [transactions]);

    // Render
    return (
        <div id="transaction-list" className="flex flex-col items-center gap-4 bg-[var(--bckground-muted)] rounded-md p-3">
            <h3>Transactions History</h3>
            <p className="text-center -mt-2">
                Click on transaction for more details. To filter and order, click on table headers. For category filter, click on specific category.
            </p>

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
                    onClick={resetFilters}
                    className="flex justify-center bg-[var(--color-dark-blue)] py-[8px] px-[6px] rounded-full duration-200 hover:rotate-180 cursor-pointer"
                >
                    <i title="Reset filters" className="fa-solid fa-rotate"></i>
                </div>
            </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th onClick={setDateReorder}>
                            {tableHeads.d}
                            {dateAscending === false ? (
                                <i className="fa-solid fa-angle-down text-xs text-blue-300 duration-200"></i>
                            ) : dateAscending === true ? (
                                <i className="fa-solid fa-angle-down text-xs text-blue-300 rotate-180 duration-200"></i>
                            ) : (
                                <i className="fa-solid fa-angle-down text-xs text-[var(--foreground)] duration-200"></i>
                            )}
                        </th>

                        <th
                            onClick={setTypeFilterToggle}
                            className={`type-table-header ${typeFilter === true ? 'text-green-300' : typeFilter === false ? 'text-red-400' : ''}`}
                        >
                            {tableHeads.t}
                        </th>

                        <th onClick={setAmountReorder}>
                            {tableHeads.a}
                            {amountDescending === true ? (
                                <i className="fa-solid fa-angle-down text-xs text-blue-300 duration-200"></i>
                            ) : amountDescending === false ? (
                                <i className="fa-solid fa-angle-down text-xs text-blue-300 rotate-180 duration-200"></i>
                            ) : (
                                <i className="fa-solid fa-angle-down text-xs text-[var(--foreground)] duration-200"></i>
                            )}
                        </th>

                        <th className="category-table-header">{tableHeads.c}</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredAndSortedTList.slice(0, transactionCount).map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            screenWidth={screenWidth}
                            transaction={transaction}
                            currency={currency}
                            setCategoryFilter={setCategoryFilter}
                            setTableHeads={setTableHeads}
                            deleteTransaction={deleteTransaction}
                        />
                    ))}
                </tbody>
            </table>

            <div className="flex gap-4 w-full justify-center">
                <button onClick={() => setTransactionCount((tC) => tC + 10)} className="expand-shorten-btn" disabled={transactionCount >= filteredAndSortedTList.length}>
                    <h4><i className="fa-solid fa-arrow-down-long"></i></h4> {/* Expand */} 
                </button>
                <button onClick={() => setTransactionCount((tC) => tC - 10)} className="expand-shorten-btn" disabled={transactionCount <= 10}>
                    <h4><i className="fa-solid fa-arrow-up-long"></i></h4> {/* Shorten */}
                </button>
            </div>
        </div>
    );
};

export default List;
