'use client'

import Entry from "../../components/Entry";
import Summary from "../../components/Summary";
import TopNav from "../../components/TopNav";
import { useEffect, useState } from "react"
import { JSX } from "@emotion/react/jsx-runtime";
import { FAKE_TRANSACTIONS } from "./utils";
import { Transaction } from "./interfaces/Transaction";
import TransactionHistory from "../../components/TransactionHistory";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(FAKE_TRANSACTIONS)
  const [currency, setCurrency] = useState<JSX.Element>(<i className="fa-solid fa-euro-sign text-base"></i>) // <i class="fa-solid fa-dollar-sign text-xl"></i>

  return (
    <>
      <main className="flex flex-col gap-3 p-3">
        <TopNav />
        <hr />
        <Entry
          setTransactions={setTransactions}
        />
        <TransactionHistory
          transactions={transactions}
          currency={currency}
          setTransactions={setTransactions}
        />
      </main>
      <footer>

      </footer>
    </>
  );
}
