import { createGlobalStyle } from 'styled-components';
import { reset } from './reset.styles';
import { variables } from './variables.styles';
import { getFontSize, getSpacing } from './utils.styles';

export const GlobalStyle = createGlobalStyle`
    ${variables}
    ${reset}

    body {
        font-family: 'Rubik', sans-serif;
        min-height: 100vh;
        background-color: var(--color-dark-gray);
        color: var(--color-text);
    }

    .max-width-wrapper {
        width: 100%;
        max-width: 1600px;
        margin-left: auto;
        margin-right: auto;
        padding-left: ${getSpacing(4)};
        padding-right: ${getSpacing(4)};
    }

    .max-width-wrapper-inner {
        width: 100%;
        max-width: 1600px;
        margin-left: auto;
        margin-right: auto;
        padding-top: ${getSpacing(4)};
        padding-left: ${getSpacing(16)};
        padding-right: ${getSpacing(16)};
        
        @media (max-width: 780px) {
            padding-top: ${getSpacing(1)};
            padding-left: ${getSpacing(8)};
            padding-right: ${getSpacing(8)};
        }
        
        @media (max-width: 650px) {
            padding-left: ${getSpacing(4)};
            padding-right: ${getSpacing(4)};
        }
    }

    ::-webkit-scrollbar {
        width: 12px;
        background-color: var(--color-gray);
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: var(--color-light-gray);
        border: 2px solid var(--color-gray);
    }
    
    ::-webkit-scrollbar-track {
        border-radius: 3px;
        background-color: transparent;
    }

    h1 {
        font-size: ${getFontSize('h1')};
    }

    h2 {
        font-size: ${getFontSize('h2')};
    }
`;
