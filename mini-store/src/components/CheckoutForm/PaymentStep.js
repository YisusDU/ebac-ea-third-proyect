import React, { useState } from "react";
import { Label, Input, Button } from "./styled";

const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  nextStep,
  prevStep,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePaymentSave = (e) => {
    e.preventDefault();
    setPaymentMethod(
      `Card ending in ${cardNumber.slice(-4)}, Expiry ${expiryDate}`
    );
    nextStep();
  };

  return (
    <form onSubmit={handlePaymentSave}>
      <Label>Card Number</Label>
      <Input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
      />
      <Label>Expiry Date</Label>
      <Input
        type="text"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />
      <Label>CVV</Label>
      <Input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        required
      />
      <Button type="submit">Next</Button>
      <Button type="button" onClick={prevStep()}>
        Back
      </Button>
    </form>
  );
};

export default PaymentStep;
