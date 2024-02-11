import axios from "axios";
import IDataList from "../models/IDataList";


export const getItemsData = () => {
    return axios.get<IDataList[]>("http://localhost:4001/items").then((response => response.data))
}

export const pushData = (newExpense : Omit<IDataList,"id">) => {

    return axios.post<IDataList>("http://localhost:4001/items",
    newExpense,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
.then( response => response.data )
    
}