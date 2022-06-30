import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function OrderDetail(props) {
  const [cart, setCart] = useState([]);
  const [itemPriceTotal, setItemPriceTotal] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const reducer = (acc, item) => {
    return acc + item.itemPrice * cookies.cart[item._id];
  };
  const calcSum = () => {
    console.log("called calcSum");
    var sum = 0;
    if (!cart) {
      console.log("missing", cart);
      return sum;
    }
    const newSum = cart.reduce(reducer, sum);
    console.log(newSum);
    setItemPriceTotal(newSum);
  };
  useEffect(() => {
    console.log(cookies.cart);
    const itemList = Object.keys(cookies.cart);
    console.log(itemList);
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/items/itemList`, {
        itemList: itemList,
      })
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
        calcSum();
      })
      .catch((err) => console.log(err));
    //calcSum();
  }, []);
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item._id != id);
    setCart(arr);
    const newSum = calcSum();
    setItemPriceTotal(newSum);
  };
  return (
    <div>
      {cart &&
        cart.map((item) => {
          return (
            <div key={item._id}>
              {item.itemName} ${item.itemPrice} {cookies.cart[item._id]}
            </div>
          );
        })}
      sum: $ {itemPriceTotal}
    </div>
  );
}

export default OrderDetail;
