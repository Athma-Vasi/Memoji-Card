import styled from 'styled-components'

type WrapperProps = {
	colour?: string
	backgroundColour?: string
}

const Wrapper = styled.div<WrapperProps>`
	width: calc(100% - 3rem);

	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	transition: 146ms all ease-in-out;
`

export default Wrapper
