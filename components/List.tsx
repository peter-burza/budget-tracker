'use client'

import { FAKE_TRANSACTIONS } from "@/app/utils"
import { JSX } from "@emotion/react/jsx-runtime"
import { useEffect, useState } from "react"
import TransactionCard from "./TransactionCard"
import { Transaction } from "@/app/interfaces/Transaction"
import { setDefaultAutoSelectFamily } from "net"
import { dateCalendarClasses } from "@mui/x-date-pickers"

interface ListProps {
    currency: JSX.Element
}

type tableHeadkey = 'd' | 't' | 'a' | 'c'

const List: React.FC<ListProps> = ({ currency }) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>(FAKE_TRANSACTIONS)
    const [screenWidth, setScreenWidth] = useState(0);
    const [tableHeads, setTableHeads] = useState<Record<tableHeadkey, JSX.Element | string>>({ d: '', t: '', a: '', c: '' })
    const [transactionCount, setTransactionCount] = useState<number>(10)

    const [dateDescending, setDateDescending] = useState<boolean | null>(true)
    const [isIncome, setIsIncome] = useState<boolean | null>(null)
    const [amountDescending, setAmountDescending] = useState<boolean | null>(null)
    const [categoryPick, setCategoryPick] = useState<boolean | null>(null)

    function filterListByType(newList: Transaction[]): void {
        if (isIncome === null) {
            newList = FAKE_TRANSACTIONS
            console.log("filtered by type ALL");
        } else if (isIncome === true) {
            newList = [...FAKE_TRANSACTIONS].filter((transaction) => transaction.type === "+")
            console.log("filtered by type +");
        } else {
            newList = [...FAKE_TRANSACTIONS].filter((transaction) => transaction.type === "-")
            console.log("filtered by type -");
        }

        newList = reorderListByDate(newList)
        newList = reorderListByAmount(newList)

        setTransactionList(newList)
    }

    function reorderListByDate(list: Transaction[]): Transaction[] {
        if (dateDescending === true) {
            console.log("date DEscending");
            return [...list].sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
        } else if (dateDescending === false) {
            console.log("date Ascending");
            return [...list].sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
        }
        return list
    }

    function reorderListByAmount(list: Transaction[]): Transaction[] {
        if (amountDescending === true) {
            console.log("amount DEscending");
            return [...list].sort((a, b) => {
                return a.amount - b.amount
            })
        } else if (amountDescending === false) {
            console.log("amount Ascending");
            return [...list].sort((a, b) => {
                return b.amount - a.amount
            })
        }
        return list
    }

    function filterByType() {
        if (isIncome === null) setIsIncome(true)
        else if (isIncome === true) setIsIncome(false)
        else setIsIncome(null)
    }

    function reorderByDate(): void {
        setAmountDescending(null)
        if (dateDescending === true) setDateDescending(false)
        else if (dateDescending === false || dateDescending === null) setDateDescending(true)
    }

    function reorderAmount(): void {
        setDateDescending(null)
        if (amountDescending === true) setAmountDescending(false)
        else if (amountDescending === false || amountDescending === null) setAmountDescending(true)
    }

    useEffect(() => {
        console.log("dateDescending" + ": " + dateDescending);
        console.log("isIncome" + ": " + isIncome);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryPick" + ": " + categoryPick);

        filterListByType(FAKE_TRANSACTIONS)

    }, [isIncome])

    useEffect(() => {
        console.log("dateDescending" + ": " + dateDescending);
        console.log("isIncome" + ": " + isIncome);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryPick" + ": " + categoryPick);

        setTransactionList(reorderListByDate(transactionList))

    }, [dateDescending])
    
    useEffect(() => {
        console.log("dateDescending" + ": " + dateDescending);
        console.log("isIncome" + ": " + isIncome);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryPick" + ": " + categoryPick);

        setTransactionList(reorderListByAmount(transactionList))

    }, [amountDescending])

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
            <h3>Transactions History</h3>
            <p>Click on transaction for more details</p>
            <table className="list-table">
                <thead>
                    <tr>
                        <th onClick={reorderByDate}>{tableHeads.d}</th>
                        <th onClick={filterByType} className="type-table-header">{tableHeads.t}</th>
                        <th onClick={reorderAmount}>{tableHeads.a}</th>
                        <th className="category-table-header">{tableHeads.c}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionList.slice(0, transactionCount).map((transaction) => {
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