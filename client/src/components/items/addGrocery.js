import React, {useState} from "react";
import axios from "axios"; 
import {Link, Navigate, useNavigate} from "react-router-dom";

function CreateProduct (props)  {
    const {productList, setProductList} = props; 

    const [itemName, setItemName] = useState("");
    const [itemClass, setItemClass] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [groceryId, setGroceryId] = useState();
    const [errors, setErrors] = useState({});

    const submitHandler = (e) => {
        e.preventDefault(); 
        axios
        .post('http://localhost:8000/api/item', {
            itemName,
            itemClass,
            itemQuantity,
            itemDescription,
            itemPrice,
            groceryId
        })
        .then ((res) => {
            console.log(`result of create item L ${res}`);
            navigate('/');
        })
        .catch((err) => {
            console.log(err.response.data.error);
            setErrors(err.response.data.error.errors)
        });
    };

return (
    <form className = "create_grocery" onSubmit = {submitHandler}>
        <h3>Add Groceries</h3>
        
        <label>Grocery Title : </label>
        <input type = "text" value = {itemName} name = "itemName"
        onchange = {(e) => setItemName(e.target.value)} />
        {errors.itemName && <p clasName = "text-danger">{errors.itemName.message}</p>}
        

    </form>
)
}