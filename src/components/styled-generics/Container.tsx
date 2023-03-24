import styled from 'styled-components'

type ContainerProps = {
	colour?: string
	backgroundColour?: string
}

const Container = styled.div<ContainerProps>`
	width: 100%;

	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	gap: clamp(1rem, 3vw, 4rem);

	transition: 146ms all ease-in-out;
`

export default Container
