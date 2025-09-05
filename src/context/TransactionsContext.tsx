'use client'

import { Transaction } from "@/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"


type TransactionsContextType = {
    transactions: Transaction[]
    setTransactions: Dispatch<SetStateAction<Transaction[]>>
    clearTransactions: () => void
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)


export function useTransactions(): TransactionsContextType {
    const context = useContext(TransactionsContext)
    if (!context) {
        throw new Error('useTransactions must be used within an TransactionsProvider')
    }
    return context
}


export default function TransactionsProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const clearTransactions = () => {setTransactions([])}

    const value: TransactionsContextType = {
        transactions,
        setTransactions,
        clearTransactions
    }

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}