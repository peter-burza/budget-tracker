'use client'

import { Category, Transaction } from "@/app/interfaces/Transaction"
import React, { useEffect, useState } from "react"
import ResponsiveDatePicker from "./ui/ResponsiveDatePicker"
import dayjs from "dayjs"

interface EntryProps {
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

const Entry: React.FC<EntryProps> = ({ setTransactions }) => {
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        id: "",
        amount: 0,
        type: "+",
        date: dayjs(Date.now()).format("YYYY-MM-DD"),
        category: Category.Salary,
    })

    function displayAmount(amount: number): string {
        if (amount == 0) return ''
        return amount.toString()
    }

    function setAmount(value: string): void {
        let result: number
        const parsedValue = parseInt(value)
        if (Number.isNaN(parsedValue))
            result = 0
        else
            result = parsedValue
        setNewTransaction(prev => ({
            ...prev, amount: result
        }))
    }

    function setType(value: string): void {
        let result: "+" | "-"
        if (value === "+")
            result = value
        else
            result = "-"
        setNewTransaction(prev => ({
            ...prev, type: result
        }))
    }

    function setCategory(value: string): void {
        let result: Category | undefined = Object.values(Category).find(c => c === value)
        if (result !== undefined) {
            setNewTransaction(prev => ({
                ...prev, category: result
            }))
        }
    }

    function setDate(value: dayjs.Dayjs): void {
        const dateOnly: string = value.format("YYYY-MM-DD")
        setNewTransaction(prev => ({
            ...prev, date: dateOnly
        }))
    }

    function setDescription(value: string): void {
        setNewTransaction(prev => ({ ...prev, description: value }))
    }

    // useEffect(() => {
    //     console.log(newTransaction)
    // }, [newTransaction])

    return (
        <div id="transaction-entry" className="flex flex-col items-center gap-2 bg-[var(--bckground-muted)] rounded-md p-3">
            <h2>New Entry</h2>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Amount:</p>
                <input value={displayAmount(newTransaction.amount)} onChange={(e) => { setAmount(e.target.value) }} type="number" />
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Type:</p>
                <select value={newTransaction.type} onChange={(e) => { setType(e.target.value) }}>
                    <option value="+">Income</option>
                    <option value="-">Expense</option>
                </select>
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Category:</p>
                <select value={newTransaction.category} onChange={e => { setCategory(e.target.value) }}>
                    {Object.values(Category).map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p className="-mb-2">Date:</p>
                <ResponsiveDatePicker setTransactionDate={setDate} />
            </div>
            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p className="">Description:</p>
                <textarea onChange={e => { setDescription(e.target.value) }} className="bg-[var(--foreground)] text-[var(--background)] outline-0 p-2 px-3 rounded-sm" placeholder="Transaction detail"></textarea>
            </div>
            <button onClick={() => { setTransactions(prev => ([ ...prev, newTransaction ])) }} ><h4>Add transaction</h4></button>
        </div>
    )
}

export default Entry