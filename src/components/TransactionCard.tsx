'use client'

import { Transaction } from "@/interfaces"
import { Category } from '@/enums'
import { TrType } from '@/enums'
import { Currency } from "@/types";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";
import Modal from "./Modal";

interface TransactionCardProps {
    screenWidth: number
    transaction: Transaction,
    selectedCurrency: Currency
    setCategoryFilter: React.Dispatch<React.SetStateAction<Category | null>>
    deleteTransaction: (deleteTrId: string | undefined) => void
    isLastIdx: boolean
    displayCategory: (category: Category) => string | JSX.Element
    displayAmount: (amount: number) => string
}

function displayType(type: TrType): JSX.Element {
    if (type === TrType.Income) return <i className="fa-solid fa-angles-up"></i>
    return <i className="fa-solid fa-angles-down"></i>
}

const TransactionCard: React.FC<TransactionCardProps> = ({ screenWidth, transaction, selectedCurrency, setCategoryFilter, deleteTransaction, isLastIdx, displayCategory, displayAmount }) => {
    const cardStyle: string = transaction.type === TrType.Income ? 'bg-[var(--color-list-bg-green)] !border-[var(--color-list-border-green)] text-green-100' : 'bg-[var(--color-list-bg-red)] !border-[var(--color-list-border-red)] text-red-100'
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [deleteQuestion, setDeleteQuestion] = useState<boolean>(false)

    function shortenDate(dateStr: string): string {
        if (screenWidth > 510) return dateStr
        const [year, month, day] = dateStr.split('-');

        const shortYear = year.slice(2); // "2025" → "25"
        const shortMonth = String(Number(month)); // "08" → 8
        const shortDay = String(Number(day));     // "05" → 5, "12" → 12

        return `${shortYear}-${shortMonth}-${shortDay}`;
    }

    function toggleExpanded(): void {
        setIsExpanded(!isExpanded)
    }

    function toggleShowDeleteQ() {
        setDeleteQuestion(!deleteQuestion)
    }

    function yesDelete() {
        deleteTransaction(transaction.id)
        toggleShowDeleteQ()
        toggleExpanded()
    }


    return isExpanded ? (
        <>
        
            <Modal onClose={toggleShowDeleteQ} isOpen={deleteQuestion} onConfirm={yesDelete}>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex flex-col items-center">
                        <p>Are you sure?</p>
                        <small>(This will delete the transaction permanently.)</small>
                    </div>
                    <div className="flex justify-evenly gap-1 w-full -mb-2.5">
                        <button onClick={yesDelete} className="secondary-btn !p-0.75 items-center">
                            <p className="px-2">Yes</p>
                        </button>
                        <button onClick={toggleShowDeleteQ} className="secondary-btn !p-0.75 items-center">
                            <p className="px-2">No</p>
                        </button>
                    </div>
                </div>
            </Modal>

            <tr onClick={toggleExpanded} className="clickable">
                <td colSpan={4} className="!border-none !py-[0.1rem] !px-0">
                    <div className="flex flex-col gap-[1px]">
                        <div className="flex items-stretch gap-[1px]">
                            <div className="flex flex-col flex-[12] gap-[1px]">
                                <div className="flex items-stretch gap-[1px]">
                                    <h4 className={`flex-[2] px-2 py-1 ${cardStyle} !border-1 !border-[var(--color-dark-blue)]`}>{transaction.category}</h4>
                                    <div className={`flex flex-[1] justify-center pl-2 pr-1 py-1 ${cardStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                        <h4>{displayAmount(transaction.amount)}{" "}{selectedCurrency.symbol}</h4>
                                    </div>
                                </div>
                                <div className="flex items-stretch gap-[1px]">
                                    <h5 className={`flex-[1] px-2 py-1 ${cardStyle} !border-1 !border-[var(--color-dark-blue)]`}>Date</h5>
                                    <div className={`flex flex-[2] justify-center px-2 py-1 ${cardStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                        <h5>{transaction.date}</h5>
                                    </div>
                                </div>
                                <div className="flex items-stretch gap-[1px]">
                                    <div className={`flex-[10] ${cardStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                        <p className="m-1.5">{transaction.description !== '' ? transaction.description : 'No description...'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col flex-[1] items-stretch gap-[1px]">
                                <div className={`flex flex-col flex-[1] justify-center items-center px-1 py-1 ${cardStyle} !border-1 !border-[var(--color-dark-blue)]`}>
                                    {displayType(transaction.type)}
                                </div>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    toggleShowDeleteQ()
                                }} className={`flex flex-col flex-[1] justify-center items-center px-1 py-1 ${cardStyle} !border-1 !border-[var(--color-dark-blue)] cursor-pointer group hover:opacity-75 duration-100`}>
                                    <i className="fa-solid fa-trash-can text-red-300 group-hover:text-red-400"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    ) : (
        <tr onClick={toggleExpanded} className={`${cardStyle} clickable`}>
            <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{shortenDate(transaction.date)}</td>
            <td className={`${isLastIdx ? '!border-b-0' : ''}`} style={{}}>{displayType(transaction.type)}</td>
            <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{displayAmount(transaction.amount)}{" "}{selectedCurrency.symbol}</td>
            <td className={`${isLastIdx ? '!border-b-0' : ''} category-cell`} onClick={(e) => {
                e.stopPropagation()
                setCategoryFilter(transaction.category)
            }}>{displayCategory(transaction.category)}</td>
        </tr>
    )
}

export default TransactionCard