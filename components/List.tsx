'use client'

import { FAKE_TRANSACTIONS } from "@/app/utils"
import { JSX } from "@emotion/react/jsx-runtime"
import { useEffect, useState } from "react"
import TransactionCard from "./TransactionCard"

interface ListProps {
    currency: JSX.Element
}

type tableHeadkey = 'd' | 't' | 'a' | 'c'

const List: React.FC<ListProps> = ({ currency }) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [tableHeads, setTableHeads] = useState<Record<tableHeadkey, JSX.Element | string>>({ d: '', t: '', a: '', c: '' })
    const [transactionCount, setTransactionCount] = useState<number>(10)

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenWidth < 510) {
            setTableHeads({
                d: <i className="fa-solid fa-calendar-days text-base"></i>,
                t: <><i className="fa-solid fa-arrow-down-up-across-line"></i></>,
                a: currency,
                c: <i className="fa-solid fa-icons text-base"></i>
            })
        } else {
            setTableHeads({ d: 'Date', t: 'Type', a: 'Amount', c: 'Category' })
        }
    }, [screenWidth]);

    return (
        <div id="transaction-list" className="flex flex-col items-center gap-2 bg-[var(--bckground-muted)] rounded-md p-3">
            <h2>Transactions History</h2>
            <p>Click on transaction for more details</p>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>{tableHeads.d}</th>
                        <th className="type-table-header">{tableHeads.t}</th>
                        <th>{tableHeads.a}</th>
                        <th className="category-table-header">{tableHeads.c}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        FAKE_TRANSACTIONS.slice(0, transactionCount).map((transaction) => {
                            return (
                                <TransactionCard
                                    key={transaction.id}
                                    screenWidth={screenWidth}
                                    transaction={transaction}
                                    currency={currency}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
            {
                transactionCount < Object.keys(FAKE_TRANSACTIONS).length ? (
                    <button onClick={() => { setTransactionCount(transactionCount + 10) }}>
                        <h4>Expand</h4>
                    </button>
                ) : (
                    <button onClick={() => { setTransactionCount(10) }}>
                        <h4>Shorten</h4>
                    </button>
                )
            }
        </div>
    )
}

export default List