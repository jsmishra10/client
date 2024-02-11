import React, {useEffect, useState} from 'react';
import IDataList from '../models/IDataList';
import { getItemsData } from '../services/ItemService';
import ExpenseTrackerForm from './ExpenseTrackerForm';

export default function ShowList() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);


    useEffect(()=> {

        const fetchItemsList = async () => {

            try {
                const data = await getItemsData();
                console.log(data);
                setItems(data);
                setSum(data.reduce((result,v) =>  result + v.price , 0 ))
                calculateShares(data);
            } catch(error: any) {
                console.error(error);
                setError(error);
            }

        }
        
        fetchItemsList();


    },[showForm]);

    const calculateShares = (data: IDataList[]) => {
        
        var rahulspent : number = 0
        var rameshspent : number = 0
        data.map(
            sums => (
                sums.payeeName === "Rahul" ? (
                    rahulspent = rahulspent + sums.price
                ):
                (
                    rameshspent = rameshspent + sums.price
                )
            )
        )
        setRahulSpent(rahulspent)
        setRameshSpent(rameshspent)
        console.log(rahulspent)
    }

    const getTableHeaders = () => {
        return (
            <>
            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product Purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
        )
    }

    const renderExpense = (expense:IDataList) => {
        return (<div key={expense.id}>
            <div className="use-inline date">{expense.setDate}</div>
            <div className="use-inline">{expense.product}</div>
        <div className="use-inline price">{expense.price}</div>
        <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>

        </div>)
    }

    const renderSummary = () => {
        return (
            <>
            <div className="use-inline">Total</div>
            <div className="use-inline total">{sum}</div><br/>
            <div className="use-inline">Rahul Paid: </div>
            <div className="use-inline total Rahul">{rahulSpent}</div><br/>
            <div className="use-inline ">Ramesh Paid: </div>
            <div className="use-inline total Ramesh">{rameshSpent}</div> <br />
            <div className="use-inline payable">{rahulSpent>rameshSpent? "Pay Rahul " : "Pay Ramesh"}</div>
            <div className="use-inline price payable">{Math.abs((rahulSpent-rameshSpent)/2)}</div>
            </>
        )
    }


    return (

        <>
           <header id="page-Header">Expense Tracker</header>
           <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
           {
                showForm && (
                    <div className="form">
                        <ExpenseTrackerForm onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTrackerForm>
                    </div>
                )
            }
           {getTableHeaders()}
           {items && items.map((expense)=>renderExpense(expense))}
            <hr/>
            {renderSummary()}
        
        </>

    )
}