'use client'

import { Category, CategoryIcons, Transaction } from "@/app/interfaces/Transaction"
import { JSX } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";

interface TransactionCardProps {
    screenWidth: number
    transaction: Transaction,
    currency: JSX.Element
    setCategoryFilter: React.Dispatch<React.SetStateAction<Category | null>>
    deleteTransaction: (transaction: Transaction) => void
    isLastIdx: boolean
    displayCategory: (category: Category)=> string | JSX.Element
}

function displayType(type: string): JSX.Element {
    if (type === "+") return <i className="fa-solid fa-angles-up"></i>
    return <i className="fa-solid fa-angles-down"></i>
}

const TransactionCard: React.FC<TransactionCardProps> = ({ screenWidth, transaction, currency, setCategoryFilter, deleteTransaction, isLastIdx, displayCategory }) => {
    const highlightStyle: string = transaction.type === "+" ? 'bg-[var(--color-list-bg-green)] !border-[var(--color-list-border-green)]' : 'bg-[var(--color-list-bg-red)] !border-[var(--color-list-border-red)]'
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    function shortenDate(dateStr: string): string {
        if (screenWidth > 510) return dateStr
        const [year, month, day] = dateStr.split("-");

        const shortYear = year.slice(2); // "2025" → "25"
        const shortMonth = String(Number(month)); // "08" → 8
        const shortDay = String(Number(day));     // "05" → 5, "12" → 12

        return `${shortYear}-${shortMonth}-${shortDay}`;
    }

    function toggleExpanded(): void {
        setIsExpanded(!isExpanded)
    }

    return isExpanded ? (
        <tr onClick={toggleExpanded} className="hoverable">
            <td colSpan={4} className="!border-none !py-[0.1rem] !px-0">
                <div className="flex flex-col gap-[1px]">
                    <div className="flex items-stretch gap-[1px]">
                        <div className="flex flex-col flex-[12] gap-[1px]">
                            <div className="flex items-stretch gap-[1px]">
                                <h4 className={`flex-[2] px-2 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>{transaction.category}</h4>
                                <div className={`flex flex-[1] justify-center pl-2 pr-1 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                    <h4>{transaction.amount}</h4>
                                    <h4 className="-mt-[0.05rem]">{currency}</h4>
                                </div>
                            </div>
                            <div className="flex items-stretch gap-[1px]">
                                <h5 className={`flex-[1] px-2 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>Date</h5>
                                <div className={`flex flex-[2] justify-center px-2 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                    <h5>{transaction.date}</h5>
                                </div>
                            </div>
                            <div className="flex items-stretch gap-[1px]">
                                <div className={`flex-[10] ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                    <p className="m-1.5">{transaction.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-[1] items-stretch gap-[1px]">
                            <div className={`flex flex-col flex-[1] justify-center items-center px-1 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                {displayType(transaction.type)}
                            </div>
                            <button onClick={(e) => {
                                e.stopPropagation()
                                deleteTransaction(transaction)
                            }} className={`flex flex-col flex-[1] justify-center items-center px-1 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)] cursor-pointer group hover:opacity-75 duration-100`}>
                                <i className="fa-solid fa-trash-can text-red-300 group-hover:text-red-400"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    ) : (
        <tr onClick={toggleExpanded} className={`${highlightStyle} hoverable`}>
            <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{shortenDate(transaction.date)}</td>
            <td className={`${isLastIdx ? '!border-b-0' : ''}`} style={{}}>{displayType(transaction.type)}</td>
            <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{transaction.amount}€</td>
            <td className={`${isLastIdx ? '!border-b-0' : ''} category-cell`} onClick={(e) => {
                e.stopPropagation()
                setCategoryFilter(transaction.category)
            }}>{displayCategory(transaction.category)}</td>
        </tr>
    )
}

export default TransactionCard