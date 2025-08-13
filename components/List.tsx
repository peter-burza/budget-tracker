'use client'

import { JSX } from "@emotion/react/jsx-runtime"
import { useEffect, useState } from "react"
import TransactionCard from "./TransactionCard"
import { Category, Transaction } from "@/app/interfaces/Transaction"
import { getMonth, getMonthName, getMonthNumber, getYear } from "@/app/utils"

interface ListProps {
    currency: JSX.Element
    transactions: Transaction[]
}

export type tableHeadkey = 'd' | 't' | 'a' | 'c'

const List: React.FC<ListProps> = ({ currency, transactions }) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>(transactions)
    const [screenWidth, setScreenWidth] = useState(0);
    const [tableHeads, setTableHeads] = useState<Record<tableHeadkey, JSX.Element | string>>({ d: '', t: '', a: '', c: '' })
    const [transactionCount, setTransactionCount] = useState<number>(10)


    const [dateAscending, setDateAscending] = useState<boolean | null>(true)
    const [typeFilter, setTypeFilter] = useState<boolean | undefined | null>(undefined)
    const [amountDescending, setAmountDescending] = useState<boolean | null>(null)
    const [categoryFilter, setCategoryFilter] = useState<Category | null>(null)

    // Get last recorded transaction date (month, year)    
    const latestDateRecord: string = sortDateDescending(transactions)[0].date
    const latestMonthRecord: string = latestDateRecord.slice(5, 7)
    const latestYearRecord: string = latestDateRecord.slice(0, 4)

    // const defaultDateFilter: [string, string] = [getMonthName(latestMonthRecord), latestYearRecord]
    const [selectedMonth, setSelectedMonth] = useState<string>(latestMonthRecord)
    const [selectedYear, setSelectedYear] = useState<string>(latestYearRecord)

    // const [dateFilter, setDateFilter] = useState<[string, string]>([selectedYear, selectedMonth])



    function sortDateAscending(list: Transaction[]): Transaction[] {
        return [...list].sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
    }

    function sortDateDescending(list: Transaction[]): Transaction[] {
        return [...list].sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
    }

    function sortAmountAscending(list: Transaction[]): Transaction[] {
        return [...list].sort((a, b) => (b.amount - a.amount))
    }

    function sortAmountDescending(list: Transaction[]): Transaction[] {
        return [...list].sort((a, b) => (a.amount - b.amount))
    }

    function filterListByType(): void {
        let newList: Transaction[]
        if (typeFilter === undefined) {
            newList = transactionList
        } else
            if (typeFilter === true) {
                newList = [...transactionList].filter((transaction) => transaction.type === "+")
            } else {
                newList = [...transactionList].filter((transaction) => transaction.type === "-")
            }

        newList = reorderListByDate(newList)
        newList = reorderListByAmount(newList)

        setTransactionList(newList)
        setCategoryFilter(null)
        // setDateFilter(defaultDateFilter)
    }

    function filterListByCategory(categoryFilter: Category | null): void {
        let newList: Transaction[] = [...transactionList].filter((transaction) => transaction.category === categoryFilter)

        newList = reorderListByDate(newList)
        newList = reorderListByAmount(newList)

        setTransactionList(newList)
        setTypeFilter(null)
        // setDateFilter(defaultDateFilter)
    }

    function filterListByDate(): void {
        let newList: Transaction[] = transactions
        const filteredTListByYear = transactions.filter(t => (getYear(t.date) === selectedYear))
        const filteredTListByMonth = filteredTListByYear.filter(t => (getMonth(t.date) == getMonthNumber(selectedMonth)))
        newList = filteredTListByMonth

        newList = reorderListByDate(newList)
        newList = reorderListByAmount(newList)

        setTransactionList(newList)
        // setTypeFilter(null)
        // setCategoryFilter(null)
    }

    function reorderListByDate(list: Transaction[]): Transaction[] {
        if (dateAscending === true) {
            return sortDateAscending(list)
        } else if (dateAscending === false) {
            return sortDateDescending(list)
        }
        return list
    }

    function reorderListByAmount(list: Transaction[]): Transaction[] {
        if (amountDescending === true) {
            return sortAmountDescending(list)
        } else if (amountDescending === false) {
            return sortAmountAscending(list)
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
        setTableHeads(prev => ({ ...prev, c: (screenWidth > 510 ? 'Category' : <i className="fa-solid fa-icons text-base"></i>) }))
        setTransactionList(transactions)
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
        console.log("Date Filter changet to: " + selectedYear + "-" + selectedMonth)
        filterListByDate()
    }, [selectedYear, selectedMonth])

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
            <div className="flex justify-between w-full max-w-[200px]">
                <select onChange={(e) => { setSelectedMonth(e.target.value) }} className="!max-w-30 !max-h-7.5 !p-1" name="month-selection" id="month-selection">
                    <option value="overall">Overall</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </select>
                <div onClick={resetFilters} className="flex justify-center bg-[var(--color-dark-blue)] py-[8px] px-[6px] rounded-full duration-200 hover:rotate-180 cursor-pointer">
                    <i title="Reset filters" className="fa-solid fa-rotate"></i>
                </div>
            </div>
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
                    transactionCount < Object.keys(transactions).length ? (
                        <button onClick={() => { setTransactionCount(transactionCount + 10) }} className="primary-btn">
                            <h4>Expand</h4>
                        </button>
                    ) : (
                        <button onClick={() => { setTransactionCount(10) }} className="primary-btn">
                            <h4>Shorten</h4>
                        </button>
                    )
                }
                {/* <div onClick={resetFilters} className="flex justify-center bg-[var(--color-dark-blue)] py-[8px] px-[6px] rounded-full absolute bottom-3 right-3 duration-200 hover:rotate-180 cursor-pointer">
                    <i title="Reset filters" className="fa-solid fa-rotate"></i>
                </div> */}
            </div>
        </div>
    )
}

export default List