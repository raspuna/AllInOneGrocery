import { useEffect, useState } from 'react';
import { useNavigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Item() {
    const [item, setItem] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    
    console.log('ID', id);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/items/${id}`)
            .then((res) => {
                console.log('Item', res.data);
                setItem(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteHandler = () => {
        axios
        .delete(`http://localhost:8000/api/items/${id}`)
        .then((res) => {
            console.log(res);
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <h2>{item.itemName}</h2>
            <p>Item Class : {item.itemClass}</p>
            <p>Item Quantity : {item.itemQuantity}</p>
            <p>Item description : {item.itemDescription}</p>
            <p>Item price : {item.itemPrice}</p>
            <p>Grocery Id : {item.groceryId}</p>
            {/* <DeleteButton id = {item._id} handleDelete = {() => navigate('/')} /> */}
            <button className = "deleteButton" onclick = {deleteHandler}>Delete Item</button>
        </div>
    );
}
export default Item;