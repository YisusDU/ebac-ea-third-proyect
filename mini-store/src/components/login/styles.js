import styled from 'styled-components';
import loginImg from '../../assets/img/portadeLogin.jpg'

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color:rgb(231, 231, 231);
  color: white;
  box-sizing: border-box;`;

const LogTitle = styled.article`
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50%;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  color: #000;
  box-sizing: border-box;
  img{
    width: 100%;
    border-radius: 10px;
    box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
    }
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
    width: 100%;
    color: #d33636;
  }
span{
    color: #000;
    font-weight: bold;
    font-style: italic;
}
    
`;
const LogOptions = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0px;
    background-color:rgb(255, 255, 255);
    color: #000;
`;

const LoginSignUp = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
    border-right: 1px solid #000;
    padding: 20px;
    background-image: url(${loginImg});
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color:#000;
`;

const LoginSignIn = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #efefef;
    
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
            width: 45%;
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

    h2:nth-of-type(2) {
        margin: 15px 0;
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
        
        &:hover {
            background-color: transparent;
            color: #28a745;
        }
    } 
`;

const LoginFieldset = styled.fieldset`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40%;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        z-index: 2;
        box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
    h2{
        width: 100%;
        font-weight: bold;
        font-size: 1.5em;
        text-align: center;
    }

   form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        padding: 20px 0;

        label {
            font-weight: bold;
            margin-bottom: 5px;
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
        }
    }
        button {
        padding: 12px 24px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        border: 2px solid #007bff;
        transition: background-color 0.3s ease;

        &:hover {
            color: #007bff;
            background-color: transparent;
            border: 2px solid #007bff;
        }
}
`;
   





export {
    LoginContainer,
    LogTitle,
    LogOptions,
    LoginSignUp,
    LoginSignIn,
    LoginFieldset
};