'use client'

import { useGlobalStore } from '@/context/CurrencyZustandContext'
import { CURRENCIES } from '@/utils'
import React from 'react'

const CurrencySelector: React.FC = () => {
    const { selectedCurrency, setSelectedCurrency } = useGlobalStore()

    function setCurrency(selectedCurrCode: string): void {
        setSelectedCurrency(CURRENCIES[selectedCurrCode]);
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            <select
                id="currency"
                value={selectedCurrency.code}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.values(CURRENCIES).map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code}  -  {currency.name}  -  &#91;{currency.symbol}&#93;
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CurrencySelector
