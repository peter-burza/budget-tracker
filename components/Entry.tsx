'use client'

import { Category, Transaction } from "@/app/interfaces/Transaction"
import React, { useEffect, useState } from "react"
import ResponsiveDatePicker from "./ui/ResponsiveDatePicker"
import dayjs from "dayjs"

interface EntryProps {
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

export const Entry: React.FC<EntryProps> = ({ setTransactions }) => {
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        id: "",
        ammount: 0,
        type: "income",
        date: dayjs(Date.now()).format("YYYY-MM-DD"),
        category: Category.Salary,
    })

    function displayTransactionAmmount(ammount: number): string {
        if (ammount == 0) return ''
        return ammount.toString()
    }

    function setNewTransactionAmmount(value: string): void {
        let result: number
        const parsedValue = parseInt(value)
        if (Number.isNaN(parsedValue))
            result = 0
        else
            result = parsedValue
        setNewTransaction(prev => ({
            ...prev, ammount: result
        }))
    }

    function setNewTransactionType(value: string): void {
        let result: "income" | "expense"
        if (value === "income")
            result = value
        else
            result = "expense"
        setNewTransaction(prev => ({
            ...prev, type: result
        }))
    }

    function setNewTransactionCategory(value: string): void {
        let result: Category | undefined = Object.values(Category).find(c => c === value)
        if (result !== undefined) {
            setNewTransaction(prev => ({
                ...prev, category: result
            }))
        }
    }

    function setTransactionDate(value: dayjs.Dayjs): void {
        const dateOnly: string = value.format("YYYY-MM-DD")
        setNewTransaction(prev => ({
            ...prev, date: dateOnly
        }))
    }

    useEffect(() => {
        console.log(newTransaction)
    }, [newTransaction])

    return (
        <div id="transaction-entry" className="flex flex-col items-center gap-2 bg-[var(--bckground-muted)] rounded-md p-3">
            <h1 className="text-2xl pb-2">New Entry</h1>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Ammount:</p>
                <input value={displayTransactionAmmount(newTransaction.ammount)} onChange={(e) => { setNewTransactionAmmount(e.target.value) }} type="number" />
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Type:</p>
                <select value={newTransaction.type} onChange={(e) => { setNewTransactionType(e.target.value) }}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Category:</p>
                <select value={newTransaction.category} onChange={e => { setNewTransactionCategory(e.target.value) }}>
                    {Object.values(Category).map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p className="-mb-2">Date:</p>
                <ResponsiveDatePicker setTransactionDate={setTransactionDate} />
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p className="">Description:</p>
                <textarea className="bg-[var(--foreground)] text-[var(--background)] outline-0 p-2 px-3 rounded-sm" placeholder="Transaction detail"></textarea>
            </div>
            <button>Add transaction</button>
        </div>
    )
}

export default Entry