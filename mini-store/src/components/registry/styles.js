import styled from "styled-components";
import Theme from "../../theme/index";

const RegistryContainer = styled.article`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${Theme.colors.background};
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const RegistryLogo = styled.section`
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 40%;
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
        max-width: 250px;
        padding: 10px;
        position: absolute;
        top: -285px;
        span{
            color: #fff;
        }
    }
`;

const RegistryForm = styled.section`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;

    h1{
        align-self: start;
        font-size: 2em;
        font-weight: bold;
        text-align: center;
        color: #000;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        padding: 20px 0;

        label {
            font-weight: bold;
            margin: 10px 0 0 0;
            align-self: start;
            cursor: pointer;
        }

        input {
            width: 100%;
            height: fit-content;
            text-align: left;
            padding: 10px 10px 10px 10px;
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
        button {
           width: 80%;
           margin-top: 10px auto;
           background-color:rgb(167, 51, 40);
           border: 2px solid rgb(167, 51, 40);
           padding: 12px 24px;
           color: white;
           border-radius: 5px;
           font-size: 16px;
           cursor: pointer;
           transition: all 0.3s ease;
        
        &:hover {
            background-color: transparent;
            color:rgb(167, 51, 40);
        } 
        }
    }

    .sign__in{
        cursor: pointer;
        align-self: center;
        font-style: italic;
        font-weight: bold;
        margin-bottom: 5px;
        color: rgb(0, 119, 255); 
        text-decoration: underline;
    }
    button{
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
        }  }
`;

const RegistryImg = styled.section`
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;


export { RegistryForm, RegistryImg, RegistryContainer, RegistryLogo };