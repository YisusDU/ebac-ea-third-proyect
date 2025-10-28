import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../../redux/slices/cartSlice";
import {
  CartContainer,
  CartItem,
  ItemDetails,
  RemoveButton,
  Total,
  CheckoutButton,
} from "./styled";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>You cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id}>
            <ItemDetails>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name} </h3>
                <p>{item.price} </p>
              </div>
            </ItemDetails>
            <RemoveButton onClick={() => handleRemove(item.id)}>
              Remove
            </RemoveButton>
          </CartItem>
        ))
      )}
      <Total>Total: ${totalAmount} </Total>
      {cartItems.length > 0 && (
        <Link to="/checkout">
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </Link>
      )}
      <CheckoutButton onClick={handleClear}> Clear Cart </CheckoutButton>
    </CartContainer>
  );
};

export default Cart;
