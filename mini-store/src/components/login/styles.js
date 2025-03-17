import styled, { css } from 'styled-components';

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
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #efefef;  
  color: white;
  box-sizing: border-box;
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
    margin: 10px 0;
    }
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
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
}
    
    @media (max-width: 768px) {
        max-width: 250px;
        padding: 10px;
        position: absolute;
        top: -285px;
        span{
            color: #fff;
        }
    }
`;
const LogOptions = styled.section`
    display: flex;
    min-height: 600px;
    height: fit-content;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0px;
    background-color: #efefef;
    color: #000;
    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
    @media (prefers-color-scheme: dark) {
      background-color: #919191;
    }
    @media (prefers-color-scheme: dark) {

    }
`;

const LoginImg = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color:#000;
    overflow: hidden;

    img {
        width: 100%;
        min-height: 914px;
        border-radius: 10px 0px 0px 10px;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
        border-right: none;
        border-bottom: 1px solid #000;
        
        img {
            width: 100%;
            border-radius: 10px 0px 0px 10px;
        }
    }
`;

const LoginSignIn = styled.div`
    position: relative;
    z-index: 1;
    ${flexColumn}
    width: 30%;
    height: 100%;
    padding: 20px;
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
        @media (hover: hover) {
            button:hover, .guest:hover {
                color: #fff;
            }
        }
    }
`;

const LoginFieldset = styled.fieldset`
    ${flexColumn}
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
        ${buttonBase}
        background-color: #007bff;
        border: 2px solid #007bff;
        color: white;
        width: 100%;

        ${buttonHover}
        &:hover {
          color: #007bff;
          box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
        }
    }

    ${darkModeText}
    @media (hover: hover) {
        button:hover {
            color: #fff;
        }
    }

    @media (prefers-color-scheme: dark) {
        @media (hover: hover) {
            button:hover {
                color: #fff;
            }
        }
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