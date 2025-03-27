import styled from 'styled-components';


const CartContainer = styled.aside`
    padding: 20px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 300px;
    position: fixed;
    top: 60px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    right: ${({ isOpen }) => isOpen ? '20px' : '-100%'};
`;

const CartItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const RemoveButton = styled.button`
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #ff1a1a;
    }
`;

const CloseButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export {
    CartItem,
    RemoveButton,
    CartContainer,
    CloseButton
}
