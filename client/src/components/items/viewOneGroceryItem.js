import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';


function Item() {
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    
    console.log('ID', id);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`)
            .then((res) => {
                console.log('Item', res.data);
                setItem(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteHandler = () => {
        console.log(id)
        axios
        .delete(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`)
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
            <Header user={user} setUser={setUser}/>
            {item && <>
            <h2>{item.itemName}</h2>
            <p>Item Class : {item.itemClass}</p>
            <p>Item Quantity : {item.itemQuantity}</p>
            <p>Item description : {item.itemDescription}</p>
            <p>Item price : {item.itemPrice}</p>
            <p>Grocery Id : {item.groceryId}</p>
            {/* <DeleteButton id = {item._id} handleDelete = {() => navigate('/')} /> */}
            <button className = "deleteButton" onClick = {deleteHandler}>Delete Item</button>
            </>
            }
        </div>
    );
}
export default Item;