import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    `
