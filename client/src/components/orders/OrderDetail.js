import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import CartButton from "./CartButton";

function OrderDetail(props) {
  // item list from server
  const [cart, setCart] = useState([]);
  const [itemPriceTotal, setItemPriceTotal] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const reducer = (acc, item) => {
    console.log(item._id, cookies.cart);
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

    return newSum;
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
        const newSum = calcSum();
        setItemPriceTotal(newSum);
      })
      .catch((err) => console.log(err));
    //calcSum();
  }, []);
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    const newSum = calcSum();
    delete cookies.cart[id];
    console.log(cookies.cart);
    setCookie("cart", cookies.cart, { path: "/" });
    setItemPriceTotal(newSum);
  };
  return (
    <div>
      {cart &&
        cart.map((item) => {
          return (
            <div key={item._id}>
              {item.itemName} ${item.itemPrice} {cookies.cart[item._id]}
              <CartButton grocery={item} />
              <Button onClick={() => handleRemove(item._id)}>Remove</Button>
            </div>
          );
        })}
      sum: $ {itemPriceTotal}
    </div>
  );
}

export default OrderDetail;
