import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Title,
  Message,
  OrderDetails,
  ProductList,
  ProductItem,
  ItemDetails,
  Button,
} from "./styled";
import { useNavigate } from "react-router-dom";

const PostCheckout = () => {
  const orderItems = useSelector((state) => state.products.items);
  const navigate = useNavigate();

  const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>Order Confirmed!</Title>
      <Message>
        Thank your for your purchase. Here are the details of your order:
      </Message>
      <OrderDetails>
        <ProductList>
          {orderItems.map((item) => (
            <ProductItem key={item.id}>
              <ItemDetails>
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h4>{item.name} </h4>
                  <p>{item.price} </p>
                </div>
              </ItemDetails>
            </ProductItem>
          ))}
        </ProductList>
        <p>
          <strong>Total Amount:</strong>${totalAmount}
        </p>
        <Button onClick={handleGoHome}>Go to home</Button>
      </OrderDetails>
    </Container>
  );
};

export default PostCheckout;
