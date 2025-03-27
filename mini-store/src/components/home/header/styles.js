import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #282c34;
  color: white;
  box-sizing: border-box;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const HeaderCart = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    svg {
        width: 24px;
        height: 24px;
    }

    span {
        position: absolute;
        top: -5px;
        right: -10px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
    }
`;

export { HeaderContainer, HeaderTitle, HeaderCart };
