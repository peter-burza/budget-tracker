'use client'

import Entry from "../../components/Entry";
import TopNav from "../../components/TopNav";
import { useState } from "react"
import { JSX } from "@emotion/react/jsx-runtime";
import { FAKE_TRANSACTIONS } from "./utils";
import { Transaction } from "./interfaces/Transaction";
import TransactionHistory from "../../components/TransactionHistory";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(FAKE_TRANSACTIONS)
  const [currency, setCurrency] = useState<JSX.Element>(<i className="fa-solid fa-euro-sign text-base"></i>) // <i class="fa-solid fa-dollar-sign text-xl"></i>

  function saveTransaction(transaction: Transaction) {
    setTransactions((prev) => [...prev, transaction])
  }

  function deleteTransaction(transaction: Transaction): void {
    const updatedTransactions = transactions.filter(t => (t.id !== transaction.id))
    setTransactions(updatedTransactions)
  }

  return (
    <>
      <main className="flex flex-col gap-3 p-3">
        <TopNav />
        <Entry
          saveTransaction={saveTransaction}
        />
        <TransactionHistory
          transactions={transactions}
          currency={currency}
          deleteTransaction={deleteTransaction}
        />
      </main>
      <footer>

      </footer>
    </>
  );
}
