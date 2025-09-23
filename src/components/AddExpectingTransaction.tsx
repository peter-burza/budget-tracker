'use client'

import { useState } from "react"
import Modal from "./Modal"
import { handleDisplayZero, returnSignature, toBaseCurrency } from "./Entry"
import { Category, TrType } from "@/enums"
import dayjs from "dayjs"
import { Currency } from "@/types"
import { useCurrencyStore } from "@/context/CurrencyState"
import { CURRENCIES } from "@/utils"
import ResponsiveDatePicker from "./ui/ResponsiveDatePicker"
import { ExpectingTransaction } from "@/interfaces"
import { useAuth } from "@/context/AuthContext"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useExpTransactionsStore } from "@/context/ExpTransactionsState"


interface AddExpectingTransactionProps {

}


const AddExpectingTransaction: React.FC<AddExpectingTransactionProps> = ({ }) => {
    const { expTransactions, setExpTransactions } = useExpTransactionsStore()
    const baseCurrency = useCurrencyStore((state) => state.baseCurrency)
    const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency)
    const rates = useCurrencyStore((state) => state.rates)

    const { currentUser } = useAuth()

    const [typedAmount, setTypedAmount] = useState<number>(0)
    const [type, setType] = useState<TrType>(TrType.Expense)
    // const [date, setDate] = useState<string>(dayjs(Date.now()).format('YYYY-MM-DD'))
    const [repeatDay, setRepeatDay] = useState<number>(1)
    const [startDate, setStartDate] = useState<string>(dayjs(Date.now()).format('YYYY-MM-DD'))
    const [category, setCategory] = useState<Category>(Category.Other)
    const [description, setDescription] = useState<string>('')
    const [newTrCurrency, setNewTrCurrency] = useState<Currency>(selectedCurrency)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const cantAddEntry: boolean | undefined = typedAmount === 0 ? true : false

    // const [showDuplicateTrQ, setShowDuplicateTRQ] = useState<boolean>(false)


    // function toggleShowDuplicateTrQ() {
    //     setShowDuplicateTRQ(!showDuplicateTrQ)
    // }


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

    function handleSetDate(value: dayjs.Dayjs): void {
        const dateOnly: string = value.format('YYYY-MM-DD')
        setStartDate(dateOnly)
        setRepeatDay(Number(dateOnly.slice(8)))
    }

    function handleSetDescription(value: string): void {
        setDescription(value)
    }

    function handleSetCurrency(selectedCurrCode: string): void {
        setNewTrCurrency(CURRENCIES[selectedCurrCode]);
    }

    function addExpectingTransaction() {

    }

    async function saveTransaction(newTr: ExpectingTransaction) {
        // Guard closes
        if (!newTr.id || !newTr?.baseAmount || isLoading) return
        if (!currentUser?.uid) {
            throw new Error("User is not authenticated");
        }

        // Save try
        try {
            setIsLoading(true)
            const trRef = doc(db, "users", currentUser?.uid, "exp-transactions", newTr.id)
            const savingTransactionOnDb = await setDoc(trRef, {
                id: newTr.id,
                origAmount: newTr.origAmount,
                baseAmount: newTr.baseAmount,
                currency: newTr.currency,
                signature: newTr.signature,
                type: newTr.type,
                repeatDay: newTr.repeatDay,
                startDate: newTr.startDate,
                category: newTr.category,
                description: newTr.description || '',
                exchangeRate: newTr.exchangeRate,
                createdAt: serverTimestamp(),
            })
            setExpTransactions((prev) => [...prev, newTr])
            console.log('Expecting transaction (id: ' + newTr.id + ') added successfully');
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }


        saveTransaction({
            id: crypto.randomUUID(),
            signature: returnSignature(typedAmount, type, category, description, repeatDay, startDate, newTrCurrency.code),
            origAmount: typedAmount,
            baseAmount: (
                newTrCurrency === baseCurrency
                    ? typedAmount
                    : toBaseCurrency(typedAmount, newTrCurrency.code, rates[newTrCurrency.code])
            ),
            currency: newTrCurrency,
            type: type,
            repeatDay: repeatDay,
            startDate: startDate,
            category: category,
            description: description,
            exchangeRate: rates[newTrCurrency.code]
        })
        resetDefaultValues()
    }

    //   function saveTr() {
    //     saveTransaction({
    //       id: crypto.randomUUID(),
    //       signature: returnSignature(typedAmount, type, category, description, date, newTrCurrency.code),
    //       origAmount: typedAmount,
    //       baseAmount: (
    //         newTrCurrency === baseCurrency
    //           ? typedAmount
    //           : toBaseCurrency(typedAmount, newTrCurrency.code, rates[newTrCurrency.code])
    //       ),
    //       currency: newTrCurrency,
    //       type: type,
    //       date: date,
    //       category: category,
    //       description: description,
    //       exchangeRate: rates[newTrCurrency.code]
    //     })
    //     resetDefaultValues()
    //   }


    return (
        <>
            {/* <Modal onClose={toggleShowDuplicateTrQ} isOpen={showDuplicateTrQ} onConfirm={onModalConfirm}>
                <p className='px-5 pt-2 text-center'>You are trying to add a duplicate transaction.</p>
                <div className="flex justify-evenly gap-1 w-full -mb-2.5">
                    <button
                        onClick={onModalConfirm}
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
            </Modal> */}


            <div className="flex flex-col gap-[0.5rem]">
                <h4 className="text-center pb-2">Add Expecting Transaction</h4>
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
                    <ResponsiveDatePicker setTransactionDate={handleSetDate} />
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
                    className="secondary-btn disabled:opacity-50"
                    disabled={cantAddEntry || isLoading}
                    title={cantAddEntry ? 'Please enter amount' : ''}
                    onClick={addExpectingTransaction}
                >
                    <h5>{isLoading === true ? 'Saving...' : 'Add Transaction'}</h5>
                </button>
            </div >
        </>
    )
}

export default AddExpectingTransaction