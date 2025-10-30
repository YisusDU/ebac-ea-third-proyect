import React from "react";
import { Label, Input, Button } from "./styled";

const ShippingStep = ({ addres, setAddress, nexStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nexStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>Shipping Address</Label>
      <Input
        type="text"
        value={addres}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Button type="submit">Next</Button>
    </form>
  );
};

export default ShippingStep;
