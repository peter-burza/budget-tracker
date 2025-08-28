'use client';

import { JSX } from '@emotion/react/jsx-runtime';
import React, { useEffect, useMemo, useState } from 'react';
import TransactionCard from './TransactionCard';
import { Category, Transaction } from '@/app/interfaces/Transaction';
import ResponsiveHeader from './ResponsiveHeader';
import Modal from './Modal';
import { handleToggle } from '@/app/utils';

interface ListProps {
    currency: JSX.Element
    dateFilteredTransactions: Transaction[]
    selectedMonth: string
    selectedYear: string
    resetSignal: number
    deleteTransaction: (transaction: Transaction) => void
    screenWidth: number
    displayCategory: (category: Category) => string | JSX.Element
}

export function sortDateNewestFirst(list: Transaction[]): Transaction[] {
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

export function renderSortingIcon(sorted: boolean | null): JSX.Element {
    if (sorted === false) return <i className="fa-solid fa-angle-down text-xs text-blue-300 duration-200"></i>
    if (sorted === true) return <i className="fa-solid fa-angle-down text-xs text-blue-300 rotate-180 duration-200"></i>
    return <i className="fa-solid fa-angle-down text-xs text-[var(--foreground)] duration-200"></i>
}


const List: React.FC<ListProps> = ({ currency, dateFilteredTransactions, deleteTransaction, resetSignal, displayCategory, screenWidth }) => {
    // Filters and sorting state
    const [typeFilter, setTypeFilter] = useState<boolean | null>(null); // true = '+', false = '-', null = all
    const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);

    // Sorting toggles: dateAscending can be true/false/null (null = inactive), same for amountDescending
    const [dateAscending, setDateAscending] = useState<boolean | null>(false);
    const [amountAscending, setAmountAscending] = useState<boolean | null>(null);

    // UI state
    const [transactionCount, setTransactionCount] = useState<number>(10);

    // Modal setters
    const [showInfo, setShowInfo] = useState<boolean>(false)

    // Derived list (single source of truth)
    const transactionsList = useMemo(() => {
        let list = dateFilteredTransactions

        // Category
        if (categoryFilter !== null) {
            list = list.filter((t) => t.category === categoryFilter)
        }

        // Type
        if (typeFilter !== null) {
            list = list.filter((t) => (typeFilter ? t.type === '+' : t.type === '-'))
        }

        // Sorting (only one active at a time; if both null, keep natural order)
        if (dateAscending !== null) {
            list = dateAscending ? sortDateOldestFirst(list) : sortDateNewestFirst(list)
        } else if (amountAscending !== null) {
            list = amountAscending ? sortAmountLowFirst(list) : sortAmountHighFirst(list)
        } else {
            // default stable order: newest first
            list = sortDateNewestFirst(list)
        }

        return list;
    }, [
        dateFilteredTransactions,
        categoryFilter,
        typeFilter,
        dateAscending,
        amountAscending,
    ]);

    // Handlers
    function setTypeFilterToggle() {
        setTypeFilter((prev) => (prev === null ? true : prev === true ? false : null))
    }

    function setDateReorder(): void {
        setAmountAscending(null)
        setDateAscending((prev) => (prev === false ? true : false))
    }

    function setAmountReorder(): void {
        setDateAscending(null)
        setAmountAscending((prev) => (prev === false ? true : false))
    }

    // Reset filters and reordering
    useEffect(() => {
        setCategoryFilter(null)
        setTypeFilter(null)
        setDateAscending(false)
        setAmountAscending(null)
        setTransactionCount(10)
    }, [resetSignal])

    // Render
    return (
        <div id="transaction-list" className="flex flex-col items-center gap-4">
            {showInfo && (
                <Modal handleCloseModal={() => { setShowInfo(!showInfo) }}>
                    <h3>List usage info</h3>
                    <ul className="flex flex-col gap-2">
                        <li className='bg-[#23374e] p-1.5'>1. Click on a transaction for more details.</li>
                        <li className='bg-[#23374e] p-1.5'>2. To filter and reorder, click on table headers.</li>
                        <li className='bg-[#23374e] p-1.5'>3. For category filtering, click on a specific category.</li>
                    </ul>

                </Modal>)}
            <div className='flex gap-2 items-center'>
                <h4>List</h4>
                <i onClick={() => { handleToggle(showInfo, setShowInfo) }} className="fa-solid fa-circle-info clickable duration-200 text-sky-300"></i>
            </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th onClick={setDateReorder} className='clickable'>
                            <ResponsiveHeader label="Date" iconClass="fa-calendar-days" screenWidth={screenWidth} />
                            {renderSortingIcon(dateAscending)}
                        </th>

                        <th
                            onClick={setTypeFilterToggle}
                            className={`type-table-header ${typeFilter === true ? 'text-green-300' : typeFilter === false ? 'text-red-400' : ''} clickable`}
                        >
                            <ResponsiveHeader label="Type" iconClass="fa-arrow-down-up-across-line" screenWidth={screenWidth} />
                        </th>

                        <th onClick={setAmountReorder} className='clickable'>
                            <ResponsiveHeader label="Amount" iconClass="fa-euro-sign" screenWidth={screenWidth} />
                            {renderSortingIcon(amountAscending)}
                        </th>

                        <th onClick={() => setCategoryFilter(null)} className="category-table-header clickable">
                            <ResponsiveHeader label="Category" iconClass="fa-icons" screenWidth={screenWidth} />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {transactionsList.slice(0, transactionCount).map((transaction, idx) => {
                        const isLastIdx = idx === transactionsList.length - 1;
                        return (
                            <TransactionCard
                                key={transaction.id}
                                screenWidth={screenWidth}
                                displayCategory={displayCategory}
                                transaction={transaction}
                                currency={currency}
                                setCategoryFilter={setCategoryFilter}
                                deleteTransaction={deleteTransaction}
                                isLastIdx={isLastIdx}
                            />
                        )
                    })}
                </tbody>
            </table>

            <div className="flex gap-4 w-full justify-center">
                <button onClick={() => setTransactionCount((tC) => tC + 10)} className="expand-shorten-btn" disabled={transactionCount >= transactionsList.length}>
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
