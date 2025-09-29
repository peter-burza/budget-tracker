import { useExpTransactionsStore } from "@/context/ExpTransactionsStore"
import { useMemo, useState } from "react"
import ResponsiveHeader from "./ui/ResponsiveHeader"
import { Category, TrType } from "@/enums"
import { ExpectingTransaction } from "@/interfaces"
import { renderSortingIcon } from "./TransactionsList"
import { useAppStore } from "@/context/AppStore"
import TransactionCard from "./TransactionCard"
import { useAuth } from "@/context/AuthContext"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"
import AddExpectingTransaction from "./AddExpectingTransaction"

interface ExpTransactionsProps {

}

function sortPayDayHighFirst(list: ExpectingTransaction[]): ExpectingTransaction[] {
    return [...list].sort((a, b) => b.payDay - a.payDay)
}
function sortPayDayLowFirst(list: ExpectingTransaction[]): ExpectingTransaction[] {
    return [...list].sort((a, b) => a.payDay - b.payDay)
}
function sortAmountHighFirst(list: ExpectingTransaction[]): ExpectingTransaction[] {
    return [...list].sort((a, b) => b.origAmount - a.origAmount)
}
function sortAmountLowFirst(list: ExpectingTransaction[]): ExpectingTransaction[] {
    return [...list].sort((a, b) => a.origAmount - b.origAmount)
}

const ExpTransactions: React.FC<ExpTransactionsProps> = ({ }) => {
    const { expTransactions, setExpTransactions } = useExpTransactionsStore()
    const { screenWidth } = useAppStore()
    const { currentUser } = useAuth()

    // const [repeatDayReorder, setRepeatDayReorder] = useState<>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [typeFilter, setTypeFilter] = useState<boolean | null>(null) // true = TrType.Income, false = TrType.Expense, null = all
    const [categoryFilter, setCategoryFilter] = useState<Category | null>(null)
    const [amountAscending, setAmountAscending] = useState<boolean | null>(null)
    const [payDayAscending, setPayDayAscending] = useState<boolean | null>(null)
    const [transactionCount, setTransactionCount] = useState<number>(10)
    const [showAddExpectingTR, setShowAddExpectingTR] = useState<boolean>(false)

    const transactionsList = useMemo(() => {
        let list = expTransactions

        // Category
        if (categoryFilter !== null) {
            list = list.filter((t) => t.category === categoryFilter)
        }

        // Type
        if (typeFilter !== null) {
            list = list.filter((t) => (typeFilter ? t.type === TrType.Expense : t.type === TrType.Income))
        }

        // Sorting (only one active at a time if both null, keep natural order)
        if (payDayAscending !== null) {
            list = payDayAscending ? sortPayDayLowFirst(list) : sortPayDayHighFirst(list)
        } else if (amountAscending !== null) {
            list = amountAscending ? sortAmountLowFirst(list) : sortAmountHighFirst(list)
        } else {
            // default stable order: newest first
            list = sortPayDayHighFirst(list)
        }

        return list
    }, [
        expTransactions,
        categoryFilter,
        typeFilter,
        payDayAscending,
        amountAscending,
    ])


    function setRepeatDayReorder() {
        setAmountAscending
        setPayDayAscending((prev) => (prev === false ? true : false))
    }

    function setPayDayReorder() {

    }
    // Handlers
    function setTypeFilterToggle() {
        setTypeFilter((prev) => (prev === null ? true : prev === true ? false : null))
    }

    function setAmountReorder(): void {
        setPayDayAscending(null)
        setAmountAscending((prev) => (prev === false ? true : false))
    }
    async function deleteExpTransaction(deleteTrId: string | undefined) {
        // Guard closes
        if (isLoading || deleteTrId === undefined) return
        if (!currentUser?.uid) {
            throw new Error("User is not authenticated")
        }

        // ask if user is sure to delete this transaction

        // Delete try
        try {
            setIsLoading(true)

            const transactionRef = doc(db, "users", currentUser?.uid, "expTransactions", deleteTrId)
            const removingTr = await deleteDoc(transactionRef)

            const updatedTransactions = expTransactions.filter(t => (t.id !== deleteTrId))
            setExpTransactions(updatedTransactions)
            console.log('Transaction (id: ' + deleteTrId + ') deleted successfully')
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <table className="list-table">
                <thead>
                    <tr>
                        <th onClick={setRepeatDayReorder} className='clickable'>
                            <ResponsiveHeader label="Pay day" iconClass="fa-calendar-days" screenWidth={screenWidth} />
                            {renderSortingIcon(payDayAscending)}
                        </th>

                        <th
                            onClick={setTypeFilterToggle}
                            className={`type-table-header ${typeFilter === false ? 'text-green-300' : typeFilter === true ? 'text-red-400' : ''} clickable`}
                        >
                            <ResponsiveHeader label="Type" iconClass="fa-arrow-down-up-across-line" screenWidth={screenWidth} />
                        </th>

                        <th onClick={setAmountReorder} className='clickable'>
                            <div className='flex items-center justify-center'>
                                <ResponsiveHeader label="Amount" iconClass='fa-coins' screenWidth={screenWidth} />
                                {renderSortingIcon(amountAscending)}
                            </div>
                        </th>

                        <th onClick={() => setCategoryFilter(null)} className="category-table-header clickable">
                            <ResponsiveHeader label="Category" iconClass="fa-icons" screenWidth={screenWidth} />
                        </th>
                    </tr>
                </thead>

                <tbody className={`${isLoading && 'opacity-50 duration-200'}`}>
                    {transactionsList.length > 0
                        ? transactionsList.slice(0, transactionCount).map((transaction, idx) => {
                            const isLastIdx = idx === transactionsList.length - 1
                            return (
                                <TransactionCard
                                    key={idx}
                                    screenWidth={screenWidth}
                                    // displayAmount={displayAmount}
                                    transaction={transaction}
                                    // selectedCurrency={selectedCurrency}
                                    setCategoryFilter={setCategoryFilter}
                                    deleteTransaction={deleteExpTransaction}
                                    isLastIdx={isLastIdx}
                                />
                            )
                        })
                        : <tr>
                            <td colSpan={4} className="text-center py-4">
                                <p className="text-gray-400">
                                    {expTransactions.length > 0
                                        ? 'No transactions for selected filter.'
                                        : 'No transactions detected.'}
                                </p>
                            </td>
                        </tr>}
                </tbody>
            </table>

            {
                !showAddExpectingTR
                    ?
                    <button onClick={() => setShowAddExpectingTR(true)} className="secondary-btn">
                        <h5 className="text-center">Add Expecting Transaction</h5>
                    </button>
                    :
                    <div id="add-expecting-transaction">
                        <AddExpectingTransaction
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setShowAddExpectingTR={setShowAddExpectingTR}
                        />
                    </div>
            }
        </>
    )
}

export default ExpTransactions