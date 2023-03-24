import { createGlobalStyle } from 'styled-components'

type GlobalStyleProps = {
	colour?: string
	backgroundColour?: string
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
html {
  margin: 0;
  padding: 0;
  outline: 0;
  font-size: 62.5%;
  
  box-sizing: border-box;
}

*, *::before, *::after {
box-sizing: inherit;
}

body {	
  font-size: 1.6rem;
  width: 100vw;
  height: 100vh;

  font-family: sans-serif;

  color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};   
}

a{
  text-decoration: none;
  color: inherit;
}
`

export { GlobalStyle }
