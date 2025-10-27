import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../ProductCard";
import { List } from "./styled";
import { fetchProducts } from "../../redux/slices/productSlice";
import { ASYNC_STATUS } from "../../constants/asyncStatus";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === ASYNC_STATUS.PENDING) {
    return <div>Loading...</div>;
  }

  if (status === ASYNC_STATUS.REJECTED){
    return(<div>Error: {error} </div>)
  }

  return (
    <List>
      {items.map((product) => {
        <ProductCart key={product.id} product={product} />;
      })}
    </List>
  );
};
