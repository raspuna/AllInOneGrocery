import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function GroceryList() {
    const [groceries, setGroceries] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:8000/api/items')
        .then((res) => {
            setGroceries(res.data);
        })
        .catch((err) => {console.log("ERROR IN GET ALL ITEMS", err)})
    }, []);

    return (
        <div>
            {groceries.map((grocery) => (
                <div key = {grocery._id}>
                    <h2>{grocery.itemName}</h2>
                    {/* <img src = {grocery.itemImage} alt = "" /> */}
                    <br />
                    <Link to = {`item/${grocery._id}`}>Details</Link>
                </div>
            ))}
        </div>
    )
}
export default GroceryList;