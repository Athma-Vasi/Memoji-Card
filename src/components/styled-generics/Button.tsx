import styled from 'styled-components'

type PropsButton = {
	colour?: string
	backgroundColour?: string
}

const Button = styled.button<PropsButton>`
	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};
	font-family: inherit;
	font-size: clamp(1rem, 2vw, 2rem);
	cursor: pointer;

	width: clamp(3rem, 19vw, 13rem);
	height: clamp(2rem, 15vw, 5rem);
	line-height: 1.1;

	border-radius: 8px;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	align-self: start;

	&:hover {
		cursor: pointer;
		box-shadow: 2px 4px 4px hsl(0, 0%, 0%, 0.4), 3px 6px 6px hsl(0, 0%, 0%, 0.3),
			4px 8px 8px hsl(0, 0%, 0%, 0.2), 5px 10px 10px hsl(0, 0%, 0%, 0.1);
		transform: scale(1.0382);
	}

	transition: 146ms all ease-in-out;
`

export default Button
