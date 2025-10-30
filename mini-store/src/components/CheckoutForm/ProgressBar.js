import React from "react";
import { ProgressContainer, Step, StepLabel } from "./styled";

const ProgressBar = ({ step }) => {
  return (
    <ProgressContainer>
      <Step active={step >= 1}>
        <StepLabel>Shipping</StepLabel>
      </Step>
      <Step active={step >= 2}>
        <StepLabel>Payment</StepLabel>
      </Step>
      <Step active={step >= 3}>
        <StepLabel>Confirmation</StepLabel>
      </Step>
    </ProgressContainer>
  );
};

export default ProgressBar;
