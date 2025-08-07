'use client'

import { Category, Transaction } from "@/app/interfaces/Transaction"
import React, { useState } from "react"

interface EntryProps {
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

export const Entry: React.FC<EntryProps> = ({ setTransactions }) => {
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        id: "",
        ammount: 0,
        type: "income",
        date: new Date(),
        category: Category.Salary,
    })
    // const [newTransaction, setNewTransaction] = useState<string>("")
    // const [newTransaction, setNewTransaction] = useState<string>("")
    // const [newTransaction, setNewTransaction] = useState<string>("")

    function setNewTransactionAmmount(value: string) {
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

    return (
        <div id="transaction-entry" className="flex flex-col gap-2 bg-[var(--bckground-muted)] rounded-md p-2 px-3">
            <h1 className="text-2xl py-2">Add Transaction</h1>
            <div className="flex flex-col gap-1 max-w-58">
                <p>Ammount:</p>
                <input value={newTransaction.ammount} onChange={(e) => { setNewTransactionAmmount(e.target.value) }} type="text" />
            </div>
            {/* <div className="flex flex-col gap-1 max-w-58">
                <p>Category:</p>
                <input value={newTransaction} onChange={(e) => {setNewTransaction(e.target.value)}} type="text" />
            </div>
            <div className="flex flex-col gap-1 max-w-58">
                <p>Type:</p>
                <input value={newTransaction} onChange={(e) => {setNewTransaction(e.target.value)}} type="text" />
            </div>
            <div className="flex flex-col gap-1 max-w-58">
                <p>Description:</p>
                <input value={newTransaction} onChange={(e) => {setNewTransaction(e.target.value)}} type="text" />
            </div> */}
        </div>
    )
}

export default Entry