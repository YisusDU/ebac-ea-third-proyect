import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  min-width: 460px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #282c34;
  color: white;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px 10px;
    picture{
      min-width: 150px;
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
  min-width: 225px;
  height: 5%;
  border-radius: 10px;
  padding: 10px;
  color: #000;
  box-sizing: border-box;
  gap: 10px;

  img{
    width: 40%;
    max-width: 200px;
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
  }
  button {
    text-wrap: nowrap;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }

`;

const HeaderCart = styled.i`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    width: 2%;
    min-width: 25px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    padding: 10px;
    transition: background-color 0.3s ease-in-out;

    svg {
        width: 100%;
        height: auto;
    }

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

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;

export { HeaderLogo, HeaderContainer, HeaderSearch, HeaderCart };
