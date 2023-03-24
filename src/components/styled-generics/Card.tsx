import styled from 'styled-components'

type CardProps = {
	colour?: string
	backgroundColour?: string
}

const Card = styled.div<CardProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

	height: clamp(15rem, 20vw, 30rem);
	width: clamp(15rem, 20vw, 30rem);

	padding-left: clamp(1rem, 2vw, 3rem);
	padding-right: clamp(1rem, 2vw, 3rem);

	transition: 146ms all ease-in-out;

	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	&:hover {
		cursor: pointer;
		box-shadow: 2px 4px 4px hsl(0, 0%, 0%, 0.4), 3px 6px 6px hsl(0, 0%, 0%, 0.3),
			4px 8px 8px hsl(0, 0%, 0%, 0.2), 5px 10px 10px hsl(0, 0%, 0%, 0.1);
		transform: scale(1.0382);
	}

	border: 1px solid ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	border-radius: 4px;
`

export default Card
