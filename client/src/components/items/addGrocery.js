import React, {useState} from "react";
import axios from "axios"; 
import {Link, navigate, useNavigate} from "react-router-dom";

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
        <br />
        
        <label>Grocery Class : </label>
        <select onChange = {(e) => setItemClass(e.target.value)}>
            <option>Please Select The Item Class :</option>
            <option value = "Vegetable"></option>
            <option value = "Fruit"></option>
            <option value = "Meat"></option>
            <option value = "Canned Good"></option>
            <option value = "Dry Food"></option>
            <option value = "Misc."></option>
            </select>
        <br />

        <label> Grocery Quantity : </label>
        <input type = "number" value = {itemQuantity} name = "itemQuantity"
        onchange = {(e) => setItemQuantity(e.target.value)} />
        {errors.itemQuantity && <p className = "text-danger"> {errors.itemQuantity.message}</p>}
        <br />

        <label>Grocery Description : </label>
        <textarea id = "itemDescription" name = "itemDescription" rows = "4" cols = "50"
        onChange = {(e) => setItemDescription(e.target.value)} />
        {errors.itemDescription && <p className = "text-danger"> {errors.itemDescription.message}</p>}
        <br />

        <label>Grocery Price : </label>
        <input type= "number" value = {itemPrice} name = "itemPrice"
        onChange = {(e) => setItemPrice(e.target.value)} />
        {errors.itemPrice && <p className = "text-danger"> {errors.itemPrice.message}</p>}
        <br />

        {/* <label>Grocery Store ID</label>
        <input type = "number" value = {groceryId} name = "groceryId"
        onChange = {(e) => setGroceryId(e.target.value)} />
        {errors.groceryId && <p className = "text-danger"> {errors.groceryId.message}</p>} */}
        <input type = "submit" value = {props.buttonText} />




    </form>
)
}
export default CreateProduct;