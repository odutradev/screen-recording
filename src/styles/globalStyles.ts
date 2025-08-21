import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(4, 153, 200, 0.5);
    border-radius: 3px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(4, 153, 200, 0.7);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(4, 153, 200, 0.5) transparent;
  }
`;

export default GlobalStyles;
