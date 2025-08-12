'use client'

import { FAKE_TRANSACTIONS } from "@/app/utils"
import { JSX } from "@emotion/react/jsx-runtime"
import { useEffect, useState } from "react"
import TransactionCard from "./TransactionCard"
import { Category, Transaction } from "@/app/interfaces/Transaction"

interface ListProps {
    currency: JSX.Element
}

export type tableHeadkey = 'd' | 't' | 'a' | 'c'

const List: React.FC<ListProps> = ({ currency }) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>(FAKE_TRANSACTIONS)
    const [screenWidth, setScreenWidth] = useState(0);
    const [tableHeads, setTableHeads] = useState<Record<tableHeadkey, JSX.Element | string>>({ d: '', t: '', a: '', c: '' })
    const [transactionCount, setTransactionCount] = useState<number>(10)

    const [dateAscending, setDateAscending] = useState<boolean | null>(true)
    const [typeFilter, setTypeFilter] = useState<boolean | undefined | null>(undefined)
    const [amountDescending, setAmountDescending] = useState<boolean | null>(null)
    const [categoryFilter, setCategoryFilter] = useState<Category | null>(null)

    function filterListByType(): void {
        let newList: Transaction[]
        if (typeFilter === undefined) {
            newList = FAKE_TRANSACTIONS
        } else
            if (typeFilter === true) {
                newList = [...FAKE_TRANSACTIONS].filter((transaction) => transaction.type === "+")
            } else {
                newList = [...FAKE_TRANSACTIONS].filter((transaction) => transaction.type === "-")
            }

        newList = reorderListByDate(newList)
        newList = reorderListByAmount(newList)

        setTransactionList(newList)
        setCategoryFilter(null)
    }

    function filterListByCategory(categoryFilter: Category | null): void {
        let newList: Transaction[] = [...FAKE_TRANSACTIONS].filter((transaction) => transaction.category === categoryFilter)

        newList = reorderListByDate(newList)
        newList = reorderListByAmount(newList)

        setTransactionList(newList)
        setTypeFilter(null)
    }

    function reorderListByDate(list: Transaction[]): Transaction[] {
        if (dateAscending === true) {
            return [...list].sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
        } else if (dateAscending === false) {
            return [...list].sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
        }
        return list
    }

    function reorderListByAmount(list: Transaction[]): Transaction[] {
        if (amountDescending === true) {
            return [...list].sort((a, b) => {
                return a.amount - b.amount
            })
        } else if (amountDescending === false) {
            return [...list].sort((a, b) => {
                return b.amount - a.amount
            })
        }
        return list
    }

    function setTypeFilterToggle() {
        if (typeFilter === undefined) setTypeFilter(true)
        else if (typeFilter === true) setTypeFilter(false)
        else setTypeFilter(undefined)
    }

    function setDateRender(): void {
        setAmountDescending(null)
        if (dateAscending === true) setDateAscending(false)
        else if (dateAscending === false || dateAscending === null) setDateAscending(true)
    }

    function setAmountRender(): void {
        setDateAscending(null)
        if (amountDescending === true) setAmountDescending(false)
        else if (amountDescending === false || amountDescending === null) setAmountDescending(true)
    }

    function resetFilters() {
        setCategoryFilter(null)
        setTypeFilter(undefined)
        setDateAscending(true)
        setAmountDescending(null)
        setTableHeads(prev => ({...prev, c: (screenWidth > 510 ? 'Category' : <i className="fa-solid fa-icons text-base"></i>)}))
        setTransactionList(FAKE_TRANSACTIONS)
    }

    useEffect(() => {
        if (typeFilter === null) return
        console.log("-------------------------------------------typeFilter--" + ": " + typeFilter);
        console.log("DATAdESCENDING" + ": " + dateAscending);
        console.log("isIncome" + ": " + typeFilter);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryFilter" + ": " + categoryFilter);
        filterListByType()
    }, [typeFilter])

    useEffect(() => {
        if (dateAscending === null) return
        console.log("-------------------------------------------dateDescending --" + ": " + dateAscending);
        console.log("DATAdESCENDING" + ": " + dateAscending);
        console.log("isIncome" + ": " + typeFilter);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryFilter" + ": " + categoryFilter);
        setTransactionList(reorderListByDate(transactionList))
    }, [dateAscending])

    useEffect(() => {
        if (amountDescending === null) return
        console.log("-------------------------------------------amountDescending--" + ": " + amountDescending);
        console.log("DATAdESCENDING" + ": " + dateAscending);
        console.log("isIncome" + ": " + typeFilter);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryFilter" + ": " + categoryFilter);
        setTransactionList(reorderListByAmount(transactionList))
    }, [amountDescending])

    useEffect(() => {
        if (categoryFilter === null) return
        console.log("-------------------------------------------categoryFilter--" + ": " + categoryFilter);
        console.log("DATAdESCENDING" + ": " + dateAscending);
        console.log("isIncome" + ": " + typeFilter);
        console.log("amountDescending" + ": " + amountDescending);
        console.log("categoryFilter" + ": " + categoryFilter);
        filterListByCategory(categoryFilter)
    }, [categoryFilter])

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
            <p className="text-center">Click on transaction for more details. To filter and order, click on table headers. For category filter, click on specific category.</p>
            <table className="list-table">
                <thead>
                    <tr>
                        <th onClick={setDateRender}>{tableHeads.d}
                            {dateAscending === true ?
                                <i className="fa-solid fa-angle-down text-xs text-blue-300  duration-200"></i> :
                                dateAscending === false ?
                                    <i className="fa-solid fa-angle-down text-xs text-blue-300 rotate-180 duration-200"></i>
                                    : <i className="fa-solid fa-angle-down text-xs text-[var(--foreground)] duration-200"></i>}
                        </th>
                        <th onClick={setTypeFilterToggle} className={`type-table-header 
                        ${typeFilter === true ?
                                'text-green-300'
                                : typeFilter === false ?
                                    'text-red-400' : ''}`}>{tableHeads.t}</th>
                        <th onClick={setAmountRender}>{tableHeads.a}
                            {amountDescending === true ?
                                <i className="fa-solid fa-angle-down text-xs text-blue-300  duration-200"></i> :
                                amountDescending === false ?
                                    <i className="fa-solid fa-angle-down text-xs text-blue-300 rotate-180 duration-200"></i>
                                    : <i className="fa-solid fa-angle-down text-xs text-[var(--foreground)] duration-200"></i>}
                        </th>
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
                                    setCategoryFilter={setCategoryFilter}
                                    setTableHeads={setTableHeads}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="relative w-full text-center">
                {
                    transactionCount < Object.keys(FAKE_TRANSACTIONS).length ? (
                        <button onClick={() => { setTransactionCount(transactionCount + 10) }} className="primary-btn">
                            <h4>Expand</h4>
                        </button>
                    ) : (
                        <button onClick={() => { setTransactionCount(10) }} className="primary-btn">
                            <h4>Shorten</h4>
                        </button>
                    )
                }
                <div onClick={resetFilters} className="flex justify-center bg-[var(--color-dark-blue)] py-[8px] px-[6px] rounded-full absolute bottom-3 right-3 duration-200 hover:rotate-180 cursor-pointer">
                    <i title="Reset filters" className="fa-solid fa-rotate"></i>
                </div>
            </div>
        </div>
    )
}

export default List