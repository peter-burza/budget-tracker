'use client'

import { Category, Transaction, TrType } from '@/interfaces/Transaction'
import React, { useState } from 'react'
import ResponsiveDatePicker from './ui/ResponsiveDatePicker'
import dayjs from 'dayjs'

interface EntryProps {
  saveTransaction: (transaction: Transaction) => void
  isLoading: boolean
}

function displayAmount(amount: number): string {
  return amount === 0 ? '' : amount.toString()
}


const Entry: React.FC<EntryProps> = ({ saveTransaction, isLoading }) => {
  const [amount, setAmount] = useState<number>(0)
  const [type, setType] = useState<TrType>(TrType.Expense)
  const [date, setDate] = useState<string>(dayjs(Date.now()).format('YYYY-MM-DD'))
  const [category, setCategory] = useState<Category>(Category.Other)
  const [description, setDescription] = useState<string>('')

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

  
  return (
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
        onClick={() => {
          saveTransaction({
            id: crypto.randomUUID(),
            amount: amount,
            type: type,
            date: date,
            category: category,
            description: description
          })
          resetDefaultValues()
        }}
      >
        <h5>{isLoading === true ? 'Saving...' : 'Add Transaction'}</h5>
      </button>
    </div>
  )
}

export default Entry
