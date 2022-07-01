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
  const sumPrice = (itemList) => {
    const reducer = (acc, item) => {
      console.log(item._id, cookies.cart);
      return acc + item.itemPrice * cookies.cart[item._id];
    };
    var sum = itemList.reduce(reducer, 0);
    return sum;
  };
  const handleChange = () => {
    console.log("called handleChange");
    setItemPriceTotal(sumPrice(cart));
  };
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    delete cookies.cart[id];
    setCookie("cart", cookies.cart, { path: "/" });
    handleChange();
  };
  const getItemInCart = () => {
    const itemList = Object.keys(cookies.cart);
    console.log(itemList);
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/items/itemList`, {
        itemList: itemList,
      })
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
        setItemPriceTotal(sumPrice(res.data));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!("cart" in cookies)) {
      setCookie("cart", {}, { path: "/" });
    }
    getItemInCart();
  }, [cookies]);
  return (
    <div>
      {cart &&
        cart.map((item) => {
          return (
            <div key={item._id}>
              {item.itemName} ${item.itemPrice}
              <CartButton
                grocery={item}
                isCart={true}
                handleRemove={handleRemove}
                handleChange={handleChange}
              />
            </div>
          );
        })}
      total: $ {itemPriceTotal.toFixed(2)}
    </div>
  );
}

export default OrderDetail;
