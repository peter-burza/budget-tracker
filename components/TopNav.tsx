'use client'

import { Transaction } from "@/app/interfaces/Transaction";
import { useAuth } from "../context/AuthContext";
import React from "react";
import CurrencySelector from "./ui/CurrencySelector";
import { JSX } from "@emotion/react/jsx-runtime";
import { Currency } from "@/app/utils";

interface TopNavProps {
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
    selectedCurrency: Currency
}

const TopNav: React.FC<TopNavProps> = ({ setTransactions, setCurrency, selectedCurrency }) => {
    const { signInWithGoogle, currentUser, logout } = useAuth()

    return (
        <div id="top-nav-container" className="flex justify-between items-center">
            <h3 className="text-4xl p-2 px-2">BudgeTer</h3>
            {currentUser ?
                <button onClick={() => {
                    logout()
                    setTransactions([])
                }} className="px-2 secondary-btn">
                    <h5>Logout</h5>
                </button>
                :
                <button onClick={signInWithGoogle} className="px-2 secondary-btn">
                    <h5>Sign in with Google</h5>
                    <CurrencySelector
                        selectedCurrency={selectedCurrency}
                        setCurrency={setCurrency}
                    />
                </button>
            }

        </div>
    )
}

export default TopNav