import styled from 'styled-components'

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-left: clamp(1rem, 2vw, 3rem);
	padding-right: clamp(1rem, 2vw, 3rem);
	padding-bottom: clamp(1rem, 2vw, 3rem);

	gap: clamp(1rem, 2vw, 3rem);

	width: 100%;
`

export { Header }
