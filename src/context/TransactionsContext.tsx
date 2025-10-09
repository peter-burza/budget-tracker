'use client'

import { Transaction } from "@/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react"


type TransactionsContextType = {
    transactions: Transaction[]
    setTransactions: Dispatch<SetStateAction<Transaction[]>>
    clearTransactions: () => void
    isDuplicate: (id: string) => boolean
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

    const trSignatures = useMemo(() => {
        return new Set<string>(transactions.map(tx => tx.signature))
    }, [transactions])

    const clearTransactions = () => { setTransactions([]) }
    const isDuplicate = (signature: string) => {
        return trSignatures.has(signature)
    }

    const value: TransactionsContextType = {
        transactions,
        setTransactions,
        clearTransactions,
        isDuplicate
    }

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}