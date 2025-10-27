import styled, { css } from 'styled-components';
import loginPortade from '../../assets/img/portadeLogin.jpg'


// Mixins
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
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 80%;
  margin-top: 10px;
`;

const buttonHover = css`
  @media (hover: hover) {
    &:hover {
      background-color: transparent;
      transform: translateY(-2px);
    }
  }
`;

const darkModeText = css`
  @media (prefers-color-scheme: dark) {
    color: #fff;
    button:hover,.guest:hover {
      color: #fff;
    }
  }
`;

const LoginContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 460px;
  height: 100%;
  min-height: 100vh;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #efefef;  
  color: white;
  box-sizing: border-box;

  @media (prefers-color-scheme: dark) {
    background-color:rgb(98, 98, 98);
    color: #fff;
    p {
      color: #fff;
    }
  }


`;

const LogTitle = styled.section`
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50%;
  min-width: 225px;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  color: #000;
  box-sizing: border-box;
  

  img{
    width: 100%;
    border-radius: 10px;
    box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
    margin: 0;
    }
  h1 {
    font-size: 2em;
    margin: 0;
    width: 100%;
    color: #d33636;
  }
span{
    color: #fff;
    font-weight: bold;
    font-style: italic;
    background-color: #51bbbba8;
    border-radius: 10px;
    padding: 0 5px;
    text-wrap: nowrap;
}
    
    @media (max-width: 768px) {
        max-width: 250px;
        padding: 10px;
        position: absolute;
        top: -360px;
        span{
            color: #fff;
        }
    }
`;
const LogOptions = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    min-width: 320px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
    box-sizing: border-box;
    overflow: hidden;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
    @media (prefers-color-scheme: dark) {
      background-color: #919191;
    }
`;

const LoginImg = styled.div`
    width: 70%;
    background-image: url(${loginPortade});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: none;

    @media (max-width: 768px){
        width: 100%;
        height: 43vh;
    }
`;

const LoginSignIn = styled.div`
    position: relative;
    z-index: 1;
    ${flexColumn}
    width: 30%;
    height: 100%;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    background-color: #efefef;

    button {  
        ${buttonBase}
        background-color: #28a745;
        border: 2px solid #28a745;
        color: white;

        ${buttonHover}
        &:hover {
          color: #28a745;
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
        }
    } 

    .guest {
        ${buttonBase}
        background-color: rgb(167, 51, 40);
        border: 2px solid rgb(167, 51, 40);
        color: #fff;

        ${buttonHover}
        &:hover {
          color: rgb(167, 51, 40);
          box-shadow: 0 5px 15px rgba(167, 51, 40, 0.3);
        }
    }

    ${darkModeText}
    @media (max-width: 768px) {
        position: relative;
        width: 100%;
        height: fit-content;
        border-right: none;
        border-bottom: 1px solid #000;
    }

    
    p {
        margin: 20px 0;
        font-size: 1.2em;
        color: #666;
        position: relative;
        text-align: center;
        width: 100%;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 35%;
            height: 1px;
            background-color: #ccc;
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }
    }

    .notAcount {
        margin: 0;
        color: #333;
        font-size: 1.3em;
        text-align: center;
    } 
   //button outside the fieldset
    button {  
        width: 80%;
        margin-top: 10px;
        background-color: #28a745;
        border: 2px solid #28a745;
        padding: 12px 24px;
        color: white;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    } 

    .guest {
        width: 80%;
        margin-top: 10px;
        background-color: rgb(167, 51, 40);
        border: 2px solid rgb(167, 51, 40);
        padding: 12px 24px;
        color: #fff;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    @media (hover: hover) {
        button:hover {
            background-color: transparent;
            color: #28a745;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
        }
        
        .guest:hover {
            background-color: transparent;
            color: rgb(167, 51, 40);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(167, 51, 40, 0.3);
        }
    }

    @media (prefers-color-scheme: dark) {
        background-color: #919191;
        color: #fff;
        p {
            color: #fff;
        }
        
        .notAcount{
            color: #fff;
        }
        @media (hover: hover) {
            button:hover, .guest:hover {
                color: #fff;
            }
        }
    }
`;

const LoginFieldset = styled.fieldset`
    ${flexColumn}
    width: 90%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    z-index: 2;
    box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
    h2{
        width: 100%;
        color: #000;
        font-weight: bold;
        font-size: 1.5em;
        text-align: center;
        margin: 0;
        font-size: clamp(15px, 23px, 22px);
        text-wrap: nowrap;
    }

   form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        padding: 0px;

        label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #000;
        }
        .error-message, .message-space {
            height: 20px;
            display: block;
            margin-top: 4px;
            font-size: 0.9rem;
        }

        .error-message {
            color: #f44336;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s ease;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 5px rgba(0,123,255,0.3);
            }
            &.valid {
                border: 2px solid #4CAF50;
            }
    
            &.invalid {
                border: 2px solid #f44336;
            }
        }
    }
        button {
        ${buttonBase}
        background-color: #007bff;
        border: 2px solid #007bff;
        color: white;
        width: 100%;
        margin: 0;
    }

    ${darkModeText}
    @media (hover: hover) and (pointer: fine){
        button:hover {
            ${buttonHover}
            color: #007bff;
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
        
        }
    }

    @media (prefers-color-scheme: dark) {
        h2,form label{
            color: #fff;
        }

        @media (hover: hover) and (pointer: fine){
            button:hover {
                ${buttonHover}
                color: #fff;
                box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
            }
        }

    }
    
    @media (max-width: 768px){
        margin-top: 50px;
    }
`;
export {
    LoginContainer,
    LogTitle,
    LogOptions,
    LoginImg,
    LoginSignIn,
    LoginFieldset
};