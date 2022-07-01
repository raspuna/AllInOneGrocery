import React from "react";
import { useCookies } from "react-cookie";
import { Button } from "react-bootstrap";

function CartButton(props) {
  const { grocery, isCart } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

  const handleChange = (id, val) => {
    const newCart = {
      ...cookies.cart,
      [id]: cookies.cart[id] + val,
    };
    if (newCart[id] === 0) {
      if (isCart) {
        props.handleRemove(id);
      } else {
        delete newCart[id];
        setCookie("cart", newCart, { path: "/" });
      }
    } else {
      setCookie("cart", newCart, { path: "/" });
    }
    console.log(cookies.cart);
    props.handleChange();
  };
  return (
    <div>
      {grocery._id in cookies.cart ? (
        <div>
          <Button onClick={() => handleChange(grocery._id, 1)}>+</Button>
          <Button>{cookies.cart[grocery._id]}</Button>
          <Button onClick={() => handleChange(grocery._id, -1)}>-</Button>
          {/*remove button is only shown in cart */}
          {isCart && (
            <Button onClick={() => props.handleRemove(grocery._id)}>
              Remove
            </Button>
          )}
        </div>
      ) : isCart ? null : (
        <Button
          onClick={(e) => {
            console.log(grocery._id);
            const newCart = !(grocery._id in cookies.cart)
              ? { ...cookies.cart, [grocery._id]: 1 }
              : {
                  ...cookies.cart,
                  [grocery._id]: cookies.cart[grocery._id] + 1,
                };
            console.log({ newCart });
            setCookie("cart", newCart, { path: "/" });
          }}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}

export default CartButton;
