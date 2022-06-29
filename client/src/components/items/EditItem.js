import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

console.log('Accessing edit item component')

const EditItem = (props) => {
    const { id } = useParams();
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemClass, setItemClass] = useState([]);
    const [itemPrice, setItemPrice] = useState("");
    const [errors, setErrors] = useState({}); // we use an object because errors is an object with certain keys in browser terminal
    const [itemNotFoundError, setItemNotFoundError] = useState("");
    console.log(id);
    const navigate = useNavigate();
    
    
    useEffect(() => {
    axios
        .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/items/${id}`)
        .then((response) => {
        console.log(response.data);
        setItemName(response.data.itemName);
        setItemDescription(response.data.itemDescription);
        setItemQuantity(response.data.itemQuantity);
        setItemPrice(response.data.itemPrice);
        setItemClass(response.data.itemClass);
        })
        .catch((err) => {
        console.log("ERROR IN GET" ,err.response);
        setItemNotFoundError(`Item not found using that ID`);
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    axios
    .put(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`, {
        itemName,
        itemDescription,
        itemQuantity,
        itemClass,
        itemPrice,
    })
    .then((response) => {
    console.log(response);
    navigate('/');
    })
    .catch((err) => {
    console.log(err.response.data.error.errors);
    setErrors(err.response.data.error.errors);
    });
};
return (
    <form onSubmit={submitHandler} className = "update_item">
    {itemNotFoundError ? (
    <h2>
        {itemNotFoundError} <Link to="/newItem">Click here to add an item</Link>
    </h2>
    ) : null}
    <Link to="/">Home</Link>


    <div className="form-group">
    <label>Product : </label>
    <input
        type="text"
        id="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
    />
    <label> Item Description :  </label>
    <input
        type="text"
        id="itemDescription"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
    />
    <label> Quantity on hand :  </label>
    <input
        type="number"
        id="itemQuantity"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
        
    />
    <br />
    <label>Item Class: </label>
    <input
        type="select"
        id="itemClass"
        value={itemClass}
        onChange={(e) => setItemClass(e.target.value)}
    />
    <br />
    <label>Price : </label>
    <input
        type="text"
        id="itemPrice"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
    />
    {errors.itemName ? <p>{errors.itemName.message}</p> : null}
    {errors.itemDescription ? <p>{errors.itemDescription.message}</p> : null}
    {errors.itemQuantity ? <p>{errors.itemQuantity.message}</p> : null}
    {errors.itemClass ? <p>{errors.itemClass.message}</p> : null}
    {errors.itemPrice ? <p>{errors.itemPrice.message}</p> : null}
    </div>
    <button type="submit" className="button">
    Update Item
    </button>
</form>
);
};

export default EditItem;