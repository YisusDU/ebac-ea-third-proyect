import React, { useState } from "react";
import ShippingStep from "./ShippingStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import ProgressBar from "./ProgressBar";
import FormContainer from "./styled";

const CheckoutForm = () => {
  const [step, setStep] = useState(1);
  const [addres, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const nexStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  return (
    <FormContainer>
      <ProgressBar step={step} />
      {step === 1 && (
        <ShippingStep
          addres={addres}
          setAddress={setAddress}
          nexStep={nexStep}
        />
      )}
      {step === 2 && (
        <PaymentStep
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          prevStep={prevStep}
          nexStep={nexStep}
        />
      )}
      {step === 3 && (
        <ConfirmationStep
          address={addres}
          paymentMethod={paymentMethod}
          prevStep={prevStep}
        />
      )}
    </FormContainer>
  );
};

export default CheckoutForm;
