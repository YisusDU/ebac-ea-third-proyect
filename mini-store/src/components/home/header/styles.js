import styled, { css } from 'styled-components';

const Svg = css`
  max-width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  min-width: 25px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px;
  transition: background-color 0.3s ease-in-out;

  svg {
      width: 80%;
      min-width: 25px;
      height: auto;
  }
  @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
`;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  min-width: 480px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #282c34;
  color: white;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px 10px;
    picture{
      min-width: 90px;
      h1{
        /* display: none; */
        font-size: .9rem;  
      }
    }

  }
`;

const HeaderLogo = styled.picture`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 20%;
  max-width: 200px;
  min-width: 225px;
  height: 5%;
  border-radius: 10px;
  color: #000;
  padding: 10px;
  box-sizing: border-box;
  gap: 10px;

  img{
    width: 40%;
    max-width: 200px;
    min-width: 50px;
    border-radius: 10px;
    box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
    }
  h1 {
    font-size: 1.5em;
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
    text-wrap: nowrap;
}
`;

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  min-width: 225px;
  height: 10%;
  border-radius: 10px;
  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;

    &::-webkit-search-cancel-button {
        cursor: pointer;
        
        &:hover {
            opacity: 0.7;
        }
    }
  }
  
  button {
    text-wrap: nowrap;
    padding: 10px 0;
    border-radius: 5px;
    border: none;
  }

`;


const HeaderCart = styled.i`
  ${Svg}
  width: 5%;
  border-radius: 50%;

  span {
        position: absolute;
        top: -5px;
        right: -10px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 17px;
    }

`;
const HeaderUser = styled.i`
    width: 5%;
    height: 5%;
    border-radius: 10px;
    ${Svg}
    p{
      width: auto;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-style: italic;
      margin: 0;
    }

  @media (max-width: 768px) {
    svg{
      display: none;}
    p{
      display: flex;
      font-size: .8rem;
    }
  }

  
`;

export { HeaderLogo, HeaderContainer, HeaderSearch, HeaderUser, HeaderCart };
