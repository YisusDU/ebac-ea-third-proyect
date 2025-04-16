import styled, { css } from "styled-components";
import Theme from "../../theme/index";
import resgistryImg from '../../assets/img/registryImg.jpg'


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
  width: 80%;
  margin-top: 10px;
  padding: 12px 24px;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const buttonHover = (color, alpha = 0.3) => css`
  @media (hover: hover) {
    &:hover {
      background-color: transparent;
      color: ${color};
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(${color}, ${alpha});
    }
  }
`;

const darkMode = css`
  @media (prefers-color-scheme: dark) {
    background-color: #919191;
    color: #fff;
    p {
      color: #fff;
    }
  }
`;

const RegistryContainer = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 460px;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #efefef;   
    box-sizing: border-box;

    @media (prefers-color-scheme: dark) {
    background-color:rgb(98, 98, 98);
    color: #fff;
    p {
      color: #fff;
    }
    }
    
`;

const RegistryOptions = styled.section`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 10px;
    background-color: ${Theme.colors.background};
    overflow: hidden;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
    ${darkMode}
`;

const RegistryLogo = styled.figure`
  top: 10%;
  ${flexColumn}
  text-align: center;
  width: 40%;
  min-width: 225px;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  color: #000;
  box-sizing: border-box;

  img{
    width: 80%;
    border-radius: 10px;
    box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
    }
span{
    width: fit-content;
    font-size: 2em;
    color: #fff;
    font-weight: bold;
    font-style: italic;
    background-color: #51bbbba8;
    border-radius: 10px;
    padding: 0 5px;
}
    
    @media (max-width: 768px) {
        position: absolute;
        max-width: 250px;
        padding: 10px;
        span{
            color: #fff;
        }
    }
`;

const RegistryForm = styled.div`
    width: 60%;
    height: 100%;
    ${flexColumn}
    justify-content: center;
    box-sizing: border-box;
    padding: 10px 5%;
    border-radius: 10px 0px 0px 10px;
    h1 {
        font-size: 2em;
        margin-bottom: 10px;
        align-self: start;
    }

    form {
        ${flexColumn}
        gap: 15px;
        width: 100%;
        padding: 20px 0;
        label {
            font-weight: bold;
            margin-bottom: 5px;
            align-self: start;
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
            transition: all 0.3s ease;
            &:focus {
                outline: none;
                border-color: #66afe9;
                box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
            }
        }

        button {
           ${buttonBase}
           background-color: rgb(167, 51, 40);
           border: 2px solid rgb(167, 51, 40);
           margin: 10px auto;

           ${buttonHover('rgb(167, 51, 40)')}
        }
    }

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .sign__in {
        font-size: 1.1rem;
        cursor: pointer;
        color: rgba(0, 170, 255, 0.7);
    }

    button {
        ${buttonBase}
        background-color: #28a745;
        border: 2px solid #28a745;

        ${buttonHover('#28a745')}
    }

    ${darkMode}
    @media (prefers-color-scheme: dark) {
        .sign__in{
            color: #fff;
        }
        @media (hover: hover) {
            button:hover, form button:hover {
                color: #fff;
            }
        }
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const RegistryImg = styled.div`
    width: 40%;
    background-image: url(${resgistryImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 20%;
    border: none;

    @media (max-width: 768px){
        width: 100%;
        height: 43vh;
    }
`;


export { 
    RegistryForm, 
    RegistryImg, 
    RegistryContainer, 
    RegistryLogo,
    RegistryOptions 
};