'use client'

import { useState } from "react"
import Modal from "./Modal"
import { handleDisplayZero, returnSignature, toBaseCurrency } from "./Entry"
import { Category, TrType } from "@/enums"
import dayjs from "dayjs"
import { Currency } from "@/types"
import { useCurrencyStore } from "@/context/CurrencyState"
import { getCurrentDay } from "@/utils"
import ResponsiveDatePicker from "./ui/ResponsiveDatePicker"
import { ExpectingTransaction } from "@/interfaces"
import { useExpTransactionsStore } from "@/context/ExpTransactionsStore"
import { CURRENCIES } from "@/utils/constants"


interface AddExpectingTransactionProps {
    isLoading: boolean
    setShowAddExpectingTR: React.Dispatch<React.SetStateAction<boolean>>
    saveExpTransaction: (newTr: ExpectingTransaction) => void
}


const AddExpectingTransaction: React.FC<AddExpectingTransactionProps> = ({ isLoading, setShowAddExpectingTR, saveExpTransaction }) => {
    const { isDuplicate } = useExpTransactionsStore()
    const baseCurrency = useCurrencyStore((state) => state.baseCurrency)
    const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency)
    const rates = useCurrencyStore((state) => state.rates)

    const [typedAmount, setTypedAmount] = useState<number>(0)
    const [type, setType] = useState<TrType>(TrType.Expense)
    const [payDay, setPayDay] = useState<number>(getCurrentDay())
    const [startDate, setStartDate] = useState<string>(dayjs(Date.now()).format('YYYY-MM-DD'))
    const [category, setCategory] = useState<Category>(Category.Other)
    const [description, setDescription] = useState<string>('')
    const [newTrCurrency, setNewTrCurrency] = useState<Currency>(selectedCurrency)
    const [payDayTooHigh, setPayDayTooHigh] = useState<boolean>(false)
    const [showDuplicateTrQ, setShowDuplicateTRQ] = useState<boolean>(false)
    const [dontAskAgain, setDontAskAgain] = useState<boolean>(false)
    const expTrSignatureStructure = [typedAmount, type, category, description, payDay, startDate, newTrCurrency.code]

    const cantAddEntry: boolean | undefined = typedAmount === 0 ? true : false


    function handleSetAmount(value: string): void {
        const parsedValue = parseFloat(value)
        const validValue = Number.isNaN(parsedValue) ? 0 : parsedValue
        setTypedAmount(Math.abs(validValue))
    }

    function handleSetType(value: TrType): void {
        setType(value)
    }

    function handleSetCategory(value: Category): void {
        setCategory(value)
    }

    function handleProcessDate(value: dayjs.Dayjs): void {
        const dateOnly: string = value.format('YYYY-MM-DD')
        setStartDate(dateOnly)
        setPayDay(Number(dateOnly.slice(8)))
    }

    function handleSetDescription(value: string): void {
        setDescription(value)
    }

    function handleSetCurrency(selectedCurrCode: string): void {
        setNewTrCurrency(CURRENCIES[selectedCurrCode]);
    }

    function resetDefaultValues() {
        setTypedAmount(0)
        setType(TrType.Expense)
        setCategory(Category.Other)
        setDescription('')
        setNewTrCurrency(selectedCurrency)
    }

    function toggleShowDuplicateTrQ() {
        setShowDuplicateTRQ(!showDuplicateTrQ)
    }

    function handleSaveExpTr() {
        if (payDay > 28) {
            setPayDayTooHigh(true)
            return
        }

        const signature = returnSignature(...expTrSignatureStructure)
        if (isDuplicate(signature) && !dontAskAgain) {
            toggleShowDuplicateTrQ()
            return
        }
        saveExpTr()
    }

    function saveExpTr() {
        saveExpTransaction({
            id: crypto.randomUUID(),
            origAmount: typedAmount,
            baseAmount: (
                newTrCurrency === baseCurrency
                    ? typedAmount
                    : toBaseCurrency(typedAmount, newTrCurrency.code, rates[newTrCurrency.code])
            ),
            currency: newTrCurrency,
            signature: returnSignature(...expTrSignatureStructure),
            type: type,
            payDay: payDay,
            startDate: startDate,
            category: category,
            description: description,
            exchangeRate: rates[newTrCurrency.code],
            processedMonths: []
        })
        resetDefaultValues()
    }

    function saveDuplicateExpTr() {
        saveExpTr()
        toggleShowDuplicateTrQ()
    }


    return (
        <>
            <hr className="text-[var(--color-dark-blue)] mx-auto w-[85%] mb-2 mt-2" />

            {/* Repeat day too high */}
            <Modal onClose={() => setPayDayTooHigh(false)} isOpen={payDayTooHigh} includeOk>
                <p className="pt-5">Please make the repeating day max 28 (cause on february we won't be able to process the transaction 😂)</p>
            </Modal>

            <Modal onClose={toggleShowDuplicateTrQ} isOpen={showDuplicateTrQ} onConfirm={saveDuplicateExpTr}>
                <p className='px-5 pt-2 text-center'>You are trying to add a duplicate transaction.</p>
                <div className="flex justify-evenly gap-1 w-full -mb-2.5">
                    <button
                        onClick={saveDuplicateExpTr}
                        className='secondary-btn !p-0.75 items-center'>
                        <p className='px-2'>Confirm</p>
                    </button>
                    <button onClick={toggleShowDuplicateTrQ} className='secondary-btn !p-0.75 items-center'>
                        <p className='px-2'>Cancel</p>
                    </button>
                </div>
                <div className='flex gap-2 w-full'>
                    <input
                        className='max-w-4'
                        type="checkbox"
                        checked={dontAskAgain}
                        onChange={(e) => setDontAskAgain(e.target.checked)}
                    />
                    <p>Don't ask again</p>
                </div>
            </Modal>


            <div className="flex flex-col gap-[0.5rem] items-center pt-4">
                <button onClick={() => setShowAddExpectingTR(false)} className="border-1 border-red-400 rounded-full hover:border-transparent duration-200 cursor-pointer">
                    <div className="flex px-2 py-2.5">
                        <i className="fa-solid fa-angle-down text-base text-red-400 duration-200 rotate-180"></i>
                    </div>
                </button>

                <div className="flex flex-col gap-1 max-w-[232px] w-full">
                    <p>Amount:</p>
                    <div className="group relative w-full">
                        <input
                            value={handleDisplayZero(typedAmount)}
                            onChange={(e) => handleSetAmount(e.target.value)}
                            type="number"
                            step="any"
                            placeholder="e.g. 4.99"
                            className="w-full pr-[70px] group-hover:!shadow-none" // leave space for the select
                        />
                        <select
                            id="currency_select"
                            value={newTrCurrency.code}
                            onChange={(e) => handleSetCurrency(e.target.value)}
                            className="absolute right-0 top-0 h-full !w-[68px] px-2 bg-transparent text-inherit cursor-pointer border-none !shadow-none text-right"
                        >
                            {Object.values(CURRENCIES).map((currency) => (
                                <option
                                    key={currency.code}
                                    value={currency.code}
                                    title={`${currency.code}  -  ${currency.name}  -  ${currency.symbol}`}
                                >
                                    {currency.code}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-[232px] w-full">
                    <p>Type:</p>
                    <select
                        value={type}
                        onChange={(e) => {
                            handleSetType(e.target.value as TrType)
                        }}
                    >
                        <option value={TrType.Income}>Income</option>
                        <option value={TrType.Expense}>Expense</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 max-w-[232px] w-full">
                    <p>Category:</p>
                    <select
                        value={category}
                        onChange={(e) => {
                            handleSetCategory(e.target.value as Category)
                        }}
                    >
                        {Object.values(Category).map((c, idx) => (
                            <option
                                key={idx}
                                value={c}
                            >
                                {c}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 max-w-[232px] w-full">
                    <p className="-mb-2">Start date:</p>
                    <ResponsiveDatePicker setTransactionDate={handleProcessDate} />
                </div>

                <div className="flex flex-col gap-1 max-w-[232px] w-full">
                    <p className="">Description:</p>
                    <textarea
                        onChange={(e) => {
                            handleSetDescription(e.target.value)
                        }}
                        className="bg-[var(--foreground)] text-[var(--background)] outline-0 p-2 px-3 rounded-sm"
                        placeholder="Transaction detail"
                    ></textarea>
                </div>

                <button
                    className="secondary-btn disabled:opacity-50 !block"
                    disabled={cantAddEntry || isLoading}
                    title={cantAddEntry ? 'Please enter amount' : ''}
                    onClick={handleSaveExpTr}
                >
                    <h5>{isLoading === true ? 'Adding...' : 'Add Expecting Transaction'}</h5>
                </button>
            </div >
        </>
    )
}

export default AddExpectingTransaction