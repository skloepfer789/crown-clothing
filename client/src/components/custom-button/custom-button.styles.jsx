import styled, {css} from 'styled-components';

const invertedButtonStyles = css`
    background: white;
    color: black;
    width: 100%;

    &:hover {
        background-color: black;
        color: white;
    }
`;

const buttonStyles = css `
    background-color: black;
    border: 1px solid black;
    color: white;

    &:hover {
        background-color: white;
        color: black;
    }
`;

const googleSignInStyle = css `
    background-color: #4285f4;
    border: 1px solid #4285f4;
    color: white;

    &:hover {
        background-color: #357ae8;
        border: 1px solid #357ae8;
    }
`

//decide which button goes in
const getButtonStyles = props => {
    if (props.isGoogleSignIn) {
        return googleSignInStyle;
    }

    return props.inverted ? invertedButtonStyles : buttonStyles;
}

export const CustomButtonContainer = styled.button `
    min-width: 175px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: 300;
    cursor: pointer;
    display: flex;
    justify-content: center;

    ${getButtonStyles}

    @media screen and (max-width: 800px) {
        padding: 0 15px;
        margin-top: 15px;
        width: 80%;
        margin-left: 10%;
    }
`;