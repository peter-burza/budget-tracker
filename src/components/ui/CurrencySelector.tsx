import { Currency } from '@/types'
import { CURRENCIES } from '@/utils'
import React from 'react'

interface CurrencySelectorProps {
    selectedCurrency: Currency
    setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency>>
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, setSelectedCurrency, }) => {

    function setCurrency(selectedCurrCode: string): void {
        setSelectedCurrency(CURRENCIES[selectedCurrCode]);
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            <label htmlFor="currency" className="text-sm font-medium text-gray-700">
                Select Currency
            </label>
            <select
                id="currency"
                value={selectedCurrency.code}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.values(CURRENCIES).map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.name} - {currency.code} &#91;{currency.symbol}&#93;
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CurrencySelector
