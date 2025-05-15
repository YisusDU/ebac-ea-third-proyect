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
    box-shadow: 23px 18px 56px rgb(81 81 81);
    transition: right 0.3s ease-in-out;
    right: ${({ $isOpen }) => $isOpen ? '20px' : '-100%'};

    h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;

    }

    hr{
        margin: 10px 0;
    }
    
    svg{
        width: 40%;
    }

    p{  
        font-size: 1rem;
        margin-bottom: 5px;
    }

    .buy-button{
        background-color: #007bff;
        color: white;
        border: none; 
    }

    .buy-button-disabled{
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;  
    }

    @media (prefers-color-scheme: dark){
        color: #fff;
        background-color: #919191;

        p{
            color: #0f0f0f;
        }
    }

    @media (hover: hover) and (pointer:fine){
        .buy-button:hover{
            scale: 1.05;
            transition: scale 0.s ease-in-out; 
        }
    }
`;

const BuyButton = styled.button`
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
    transition: scale 0.3s ease-in-out; 


    
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
    CloseButton,
    BuyButton
}
