import styled from 'styled-components';


const CartContainer = styled.aside`
    padding: 20px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: fit-content;
    min-width: 350px;
    position: fixed;
    top: 60px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    right: ${({ isOpen }) => isOpen ? '20px' : '-100%'};

    h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;

    }
`;

const CartItem = styled.li`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    
    img{
        width: 50px;
        height: 50px;
    }

    figcaption {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
        font-size: 16px;
        margin-left: 10px;
       
        p{
            text-align: justify;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 180px;

            &:last-of-type{
                font-weight: bold;
            }
        }
        

    }
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
