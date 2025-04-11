import styled, { css } from "styled-components";
import Theme from "../../../theme";
import Portade from "../../../assets/img/ChckoutPortade.jpg"

// Reutilizamos los mixins
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const flexColumn = css`
  ${flexCenter}
  flex-direction: column;
`;

const buttonBase = css`
  width: 80%;
  margin-top: 20px;
  padding: 12px 24px;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CheckoutFormContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-width: 320px;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
  box-sizing: border-box;
  overflow: hidden;

  form{
    ${flexColumn}
    width: 60%;
    padding: 20px;
    gap: 20px;
    box-sizing: border-box;
  }

  fieldset {
    width: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    box-sizing: border-box;

    legend {
      font-size: 1.2em;
      font-weight: bold;
      color: ${Theme.colors.primary};
      padding: 0 10px;
    }

    i {
      display: block;
      color: #666;
      margin-bottom: 10px;
      font-size: 0.9em;
    }
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
    box-sizing: border-box;
  }
    label:last-of-type {
     display: inline 
    }

  input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    background-color: #f9f9f9;

    &:focus {
      outline: none;
      border-color: ${Theme.colors.primary};
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }

    &[type="checkbox"] {
      width: auto;
      margin-right: 10px;
    }
  }

  button {
    ${buttonBase}
    background-color: ${Theme.colors.secondary};
    border: 2px solid ${Theme.colors.secondary};
  
    @media (hover: hover) {
      &:hover {
        background-color: transparent;
        color: ${Theme.colors.primary};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
      }
    
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    min-width: 320px;
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${Theme.colors.darkModeBackgroundITem};
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
    label,fieldset legend {
      color: ${Theme.fonts.color.secondary};
    }
  }
`;

const CheckoutPortade = styled.div`
  width: 40%;
  background-image: url(${Portade});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position: 20% center;
  img{
    width: 100%;
    height: 100vh;
  }
`;

export { CheckoutFormContainer, CheckoutPortade }