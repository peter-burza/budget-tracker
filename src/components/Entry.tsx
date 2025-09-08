'use client'

import { Transaction } from '@/interfaces'
import { Category } from '@/enums'
import React, { useMemo, useState } from 'react'
import ResponsiveDatePicker from './ui/ResponsiveDatePicker'
import dayjs from 'dayjs'
import { useCurrencyStore } from '@/context/CurrencyState'
import { TrType } from '@/enums'
import Modal from './Modal'
import { useTransactions } from '@/context/TransactionsContext'

interface EntryProps {
  saveTransaction: (transaction: Transaction) => void
  isLoading: boolean
}

function displayAmount(amount: number): string {
  return amount === 0 ? '' : amount.toString()
}

function toBaseCurrency(amount: number, currencyCode: string, rates: Record<string, number>): number {
  const rate = rates[currencyCode] // how many units of that currency per 1 EUR
  if (!rate) throw new Error(`Unknown currency: ${currencyCode}`)
  return amount / rate // divide to go from that currency to EUR
}

function returnSignature(amount: number, type: TrType, category: Category, description: string, date: string) {
  return `${amount}|${type}|${category}|${description}|${date}`
}


const Entry: React.FC<EntryProps> = ({ saveTransaction, isLoading }) => {
  const [amount, setAmount] = useState<number>(0)
  const [type, setType] = useState<TrType>(TrType.Expense)
  const [date, setDate] = useState<string>(dayjs(Date.now()).format('YYYY-MM-DD'))
  const [category, setCategory] = useState<Category>(Category.Other)
  const [description, setDescription] = useState<string>('')

  const [showDuplicateTrQ, setShowDuplicateTRQ] = useState<boolean>(false)
  const [dontAskAgain, setDontAskAgain] = useState<boolean>(false)

  const { isDuplicate } = useTransactions()
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency)
  const rates = useCurrencyStore((state) => state.rates)

  const cantAddEntry: boolean | undefined =
    amount === 0 ? true : false

  function resetDefaultValues() {
    setAmount(0)
    setType(TrType.Expense)
    setCategory(Category.Other)
    setDescription('')
  }

  function handleSetAmount(value: string): void {
    const parsedValue = parseFloat(value)
    const validValue = Number.isNaN(parsedValue) ? 0 : parsedValue
    setAmount(validValue)
  }

  function handleSetType(value: TrType): void {
    setType(value)
  }

  function handleSetCategory(value: Category): void {
    // if (value !== undefined) {
    setCategory(value)
    // }
  }

  function handleSetDate(value: dayjs.Dayjs): void {
    const dateOnly: string = value.format('YYYY-MM-DD')
    setDate(dateOnly)
  }

  function handleSetDescription(value: string): void {
    setDescription(value)
  }

  function handleSaveTr() {
    const signature = returnSignature(amount, type, category, description, date)
    if (isDuplicate(signature) && !dontAskAgain) {
      toggleShowDuplicateTrQ()
      return
    }
    saveTr()
  }

  function saveTr() {
    saveTransaction({
      id: crypto.randomUUID(),
      signature: returnSignature(amount, type, category, description, date),
      amount: toBaseCurrency(amount, selectedCurrency.code, rates),
      type: type,
      date: date,
      category: category,
      description: description
    })
    resetDefaultValues()
  }

  function onModalConfirm() {
    saveTr()
    toggleShowDuplicateTrQ()
  }

  function toggleShowDuplicateTrQ() {
    setShowDuplicateTRQ(!showDuplicateTrQ)
  }


  return (
    <>
    
      <Modal onClose={toggleShowDuplicateTrQ} isOpen={showDuplicateTrQ} onConfirm={onModalConfirm}>
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
      </Modal>

      <div
        id="transaction-entry"
        className="base-container"
      >
        <h3>New Entry</h3>
        <div className="flex flex-col gap-1 max-w-[232px] w-full">
          <p>Amount:</p>
          <input
            value={displayAmount(amount)}
            onChange={(e) => {
              handleSetAmount(e.target.value)
            }}
            type="number"
            step="any"
            placeholder="e.g. 4.99"
          />
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
          <p className="-mb-2">Date:</p>
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
          onClick={handleSaveTr}
        >
          <h5>{isLoading === true ? 'Saving...' : 'Add Transaction'}</h5>
        </button>
      </div>
    </>
  )
}

export default Entry
