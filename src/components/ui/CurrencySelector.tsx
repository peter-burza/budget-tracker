'use client'

import { useSettingsStore } from '@/context/SettingsState'
import { CURRENCIES } from '@/utils'
import React from 'react'
import { db } from '../../../firebase'
import { useAuth } from '@/context/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const CurrencySelector: React.FC = () => {
    const selectedCurrency = useSettingsStore((state) => state.selectedCurrency)
    const setSelectedCurrency = useSettingsStore((state) => state.setSelectedCurrency)
    const { currentUser } = useAuth()

    async function setCurrency(selectedCurrCode: string): Promise<void> {
        //db save
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid)
            updateDoc(userRef, {
                selectedCurrency: CURRENCIES[selectedCurrCode]
            })
        }
        // local save
        setSelectedCurrency(CURRENCIES[selectedCurrCode]);
        console.log('Currency changed');
        
    }


    return (
        <select
            id="currency_select"
            value={selectedCurrency.code}
            onChange={(e) => setCurrency(e.target.value)}
        >
            {Object.values(CURRENCIES).map((currency) => (
                <option key={currency.code} value={currency.code}>
                    {currency.code}  -  {currency.name}  -  &#91;{currency.symbol}&#93;
                </option>
            ))}
        </select>
    )
}

export default CurrencySelector
