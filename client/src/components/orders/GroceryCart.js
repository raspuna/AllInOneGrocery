// possible code for grocerycart. doesnt work! just ideas, could help!

// import React, { useState, useEffect } from "react";

// const GroceryCart = ({ groceryCart, setGroceryCart, handleChange }) => {
//   const [itemPrice, setItemPrice] = useState(0);

//   const handleRemove = (id) or item name??=> {
//     const arr = groceryCart.filter((item) => item.id or name? !== id or name?);
//     setGroceryCart(arr);
//     handleItemPrice();
//   };

//   const handleItemPrice = () => {
//     let ans = 0;
//     groceryCart.map((item) => (ans += item.itemQuantity * item.itemPrice));
//     setItemPrice(ans);
//   };

//   useEffect(() => {
//     handleItemPrice();
//   });

//   return (
//     <article>
//       {groceryCart.map((item) => (
//         <div className="groceryCart_box" key={item.id or name?}>
//           <div className="groceryCart_img">
//             <img src={item.itemImage}/>
//             <p>{item.title}</p>
//           </div>
//           <div>
//             <button onClick={() => handleChange(item, 1)}>+</button>
//             <button>{item.itemQuantity}</button>
//             <button onClick={() => handleChange(item, -1)}>-</button>
//           </div>
//           <div>
//             <span>{item.itemPrice}</span>
//             <button onClick={() => handleRemove(item.id or name?)}>Remove</button>
//           </div>
//         </div>
//       ))}
//       <div className="total">
//         <span>Total=</span>
//         <span>${itemPrice}</span>
//       </div>
//     </article>
//   );
// };

// export default GroceryCart;
