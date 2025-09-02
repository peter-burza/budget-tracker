'use client'

import { Category, Transaction } from '@/interfaces/Transaction'
import React, { useState } from 'react'
import ResponsiveDatePicker from './ui/ResponsiveDatePicker'
import dayjs from 'dayjs'

interface EntryProps {
  saveTransaction: (transaction: Transaction) => void
  isLoading: boolean
}

const Entry: React.FC<EntryProps> = ({ saveTransaction, isLoading }) => {
  const defaultTrVals = {}

  // TODO: Break newTransaction into individual states
  // const [amout, setAmount] = useState<number>(0)
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    // id: crypto.randomUUID(),
    amount: 0,
    type: '-',
    date: dayjs(Date.now()).format('YYYY-MM-DD'),
    category: Category.Other
  })
  const cantAddEntry: boolean | undefined =
    newTransaction.amount === 0 ? true : false

  function displayAmount(amount: number): string {
    return amount === 0 ? '' : amount.toString()
  }

  function setAmount(value: string): void {
    const parsedValue = parseFloat(value)
    const validValue = Number.isNaN(parsedValue) ? 0 : parsedValue
    setNewTransaction((prev) => ({
      ...prev,
      amount: validValue
    }))
  }

  function setType(value: string): void {
    let result: '+' | '-'
    if (value === '+') result = value
    else result = '-'
    setNewTransaction((prev) => ({
      ...prev,
      type: result
    }))
  }

  function setCategory(value: string): void {
    let result: Category | undefined = Object.values(Category).find(
      (c) => c === value
    )
    if (result !== undefined) {
      setNewTransaction((prev) => ({
        ...prev,
        category: result
      }))
    }
  }

  function setDate(value: dayjs.Dayjs): void {
    const dateOnly: string = value.format('YYYY-MM-DD')
    setNewTransaction((prev) => ({
      ...prev,
      date: dateOnly
    }))
  }

  function setDescription(value: string): void {
    setNewTransaction((prev) => ({ ...prev, description: value }))
  }

  return (
    <div
      id="transaction-entry"
      className="flex flex-col items-center gap-2 bg-[var(--background-muted)] rounded-md p-3"
    >
      <h3>New Entry</h3>
      <div className="flex flex-col gap-1 max-w-[232px] w-full">
        <p>Amount:</p>
        <input
          value={displayAmount(newTransaction.amount)}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          type="number"
          step="any"
          placeholder="e.g. 4.99"
        />
      </div>
      <div className="flex flex-col gap-1 max-w-[232px] w-full">
        <p>Type:</p>
        <select
          value={newTransaction.type}
          onChange={(e) => {
            setType(e.target.value)
          }}
        >
          <option value="+">Income</option>
          <option value="-">Expense</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 max-w-[232px] w-full">
        <p>Category:</p>
        <select
          value={newTransaction.category}
          onChange={(e) => {
            setCategory(e.target.value)
          }}
        >
          {Object.values(Category).map((c) => (
            <option
              key={c}
              value={c}
            >
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 max-w-[232px] w-full">
        <p className="-mb-2">Date:</p>
        <ResponsiveDatePicker setTransactionDate={setDate} />
      </div>
      <div className="flex flex-col gap-1 max-w-[232px] w-full">
        <p className="">Description:</p>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value)
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
          saveTransaction({ ...newTransaction })
          setNewTransaction({ ...newTransaction, id: crypto.randomUUID() }) // Change the id, for next entry
        }}
      >
        <h5>{isLoading === true ? 'Saving...' : 'Add Transaction'}</h5>
      </button>
    </div>
  )
}

export default Entry
