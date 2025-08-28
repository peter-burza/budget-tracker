'use client'

import { Transaction } from "@/app/interfaces/Transaction";
import { useAuth } from "../context/AuthContext";
import React from "react";

interface TopNavProps {
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

const TopNav: React.FC<TopNavProps> = ({ setTransactions }) => {
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
                </button>
            }

        </div>
    )
}

export default TopNav