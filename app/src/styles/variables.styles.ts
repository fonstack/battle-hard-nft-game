import { css } from 'styled-components';

export const variables = css`
  :root {
    --color-dark-gray: #282828;
    --color-medium-gray: #2a2a2a;
    --color-gray: #3a3b3c;
    --color-light-gray: #929292;
    --color-primary: #f857a6;
    --color-secondary: #ff5858;
    --color-text: #ffffff;

    --gradient-primary-secondary: linear-gradient(100deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  }
`;
