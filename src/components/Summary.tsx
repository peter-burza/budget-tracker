'use client'

import { Transaction, TrType } from "@/interfaces/Transaction";
import { calculateTotal, handleToggle } from "@/utils";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { Currency } from "@/types";

interface SummaryProps {
    dateFilteredTransactions: Transaction[]
    selectedCurrency: Currency
    totalExpense: number
    isLoading: boolean
}

function calculateNetBalance(totalIncome: number, totalExpense: number): number {
    return Math.abs(totalIncome - totalExpense)
}

function fancyNumber(num: number): string {
    return num.toLocaleString()
}

const Summary: React.FC<SummaryProps> = ({ dateFilteredTransactions, selectedCurrency, totalExpense, isLoading }) => {
    const totalIncome = useMemo(() => {
        return calculateTotal(TrType.Income, dateFilteredTransactions)
    }, [dateFilteredTransactions])
    // Modal setters
    const [showInfo, setShowInfo] = useState<boolean>(false)

    return (
        <div id="summary" className="flex flex-col items-center gap-2 w-full">
            {/* {
                isLoading ? (
                    'Loading...'
                ) : (
                    <> */}
                        {showInfo && (
                            <Modal handleCloseModal={() => { setShowInfo(!showInfo) }}>
                                <h3>Summary</h3>
                                <ul className="flex flex-col gap-2">
                                    <li className='bg-[#23374e] p-1.5'>Basic info of the selected period.</li>
                                </ul >

                            </Modal>)}
                        <div className='flex gap-2 items-center'>
                            <h4>Summary</h4>
                            <i onClick={() => { handleToggle(showInfo, setShowInfo) }} className="fa-solid fa-circle-info clickable duration-200 text-sky-300"></i>
                        </div>
                        <div id="basic-summary-info" className={`flex flex-col w-full justify-between gap-0.25 ${isLoading && 'opacity-50 duration-200'}`}>
                           
                            <div className="flex gap-2 w-full items-center justify-center bg-[var(--color-list-bg-green)] text-green-200 p-1 border-1 border-[var(--color-dark-blue)]">
                                <h4>Income:</h4>
                                <div className="flex gap-1">
                                    <h4>{fancyNumber(totalIncome)}</h4>
                                    <h4 className="flex items-center -mt-[0.15rem]">{selectedCurrency.symbol}</h4>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full items-center justify-center bg-[var(--color-list-bg-red)] text-red-200 p-1 border-1 border-[var(--color-dark-blue)]">
                                <h4>Expence:</h4>
                                <div className="flex gap-1">
                                    <h4>- {fancyNumber(totalExpense)}</h4>
                                    <h4 className="flex items-center -mt-[0.15rem]">{selectedCurrency.symbol}</h4>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full items-center justify-center bg-sky-800 text-sky-200 p-1 border-1 border-[var(--color-dark-blue)]">
                                <h5>Net Balance:</h5>
                                <div className="flex items-center gap-1">
                                    <h5>{totalExpense > totalIncome && '- '} {fancyNumber(calculateNetBalance(totalIncome, totalExpense))}</h5>
                                    <h5 className="flex items-center -mt-[0.15rem]">{selectedCurrency.symbol}</h5>
                                </div>

                            </div>
                        </div>
                    {/* </>
                )
            } */}
        </div>
    )
}

export default Summary