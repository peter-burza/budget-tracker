import React from 'react'
import { Currency, CurrencyNames } from '@/app/utils'

interface CurrencySelectorProps {
    selectedCurrency: Currency
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    selectedCurrency,
    setCurrency,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            <label htmlFor="currency" className="text-sm font-medium text-gray-700">
                Select Currency
            </label>
            <select
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.values(Currency).map((code) => (
                    <option key={code} value={code}>
                        {CurrencyNames[code]} ({code})
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CurrencySelector
