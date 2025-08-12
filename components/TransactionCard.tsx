'use client'

import { Category, CategoryIcons, Transaction } from "@/app/interfaces/Transaction"
import { JSX } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";
import { tableHeadkey } from "./List";

interface TransactionCardProps {
    screenWidth: number
    transaction: Transaction,
    currency: JSX.Element
    setCategoryFilter: React.Dispatch<React.SetStateAction<Category | null>>
    setTableHeads: React.Dispatch<React.SetStateAction<Record<tableHeadkey, JSX.Element | string>>>
}

const TransactionCard: React.FC<TransactionCardProps> = ({ screenWidth, transaction, currency, setCategoryFilter, setTableHeads }) => {
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

    function displayType(type: string): JSX.Element {
        if (type === "+") return <i className="fa-solid fa-angles-up"></i>
        return <i className="fa-solid fa-angles-down"></i>
    }

    function displayCategory(category: Category): string | JSX.Element {
        return screenWidth > 510 ? category : CategoryIcons[category];
    }

    function toggleExpanded(): void {
        setIsExpanded(!isExpanded)
    }

    return isExpanded ? (
        <tr onClick={toggleExpanded}>
            <td colSpan={4} className="!border-none !py-[0.1rem] !px-0">
                <div className="flex flex-col gap-[1px]">
                    <div className="flex items-stretch gap-[1px]">
                        <h3 className={`flex-[2] px-2 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>{transaction.category}</h3>
                        <div className={`flex flex-[1] justify-center px-2 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                            <h3>{transaction.amount}</h3>
                            <h3 className="-mt-[0.2rem]">{currency}</h3>
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
                            <p className="m-2">{transaction.description}</p>
                        </div>
                        <div className={`flex flex-[1] justify-center px-2 py-1 ${highlightStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                            <p className="m-auto !text-xl">{displayType(transaction.type)}</p>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    ) : (
        <tr onClick={toggleExpanded} className={highlightStyle}>
            <td>{shortenDate(transaction.date)}</td>
            <td style={{}}>{displayType(transaction.type)}</td>
            <td>{transaction.amount}€</td>
            <td onClick={(e) => {
                e.stopPropagation()
                setCategoryFilter(transaction.category)
                setTableHeads(prev => ({...prev, c: displayCategory(transaction.category)}))
            }}>{displayCategory(transaction.category)}</td>
        </tr>
    )
}

export default TransactionCard