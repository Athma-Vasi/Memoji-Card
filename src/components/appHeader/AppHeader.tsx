import Container from '../styled-generics/Container'
import { Header } from '../styled-generics/Header'

export default function AppHeader() {
	return (
		<>
			<Header>
				<h1>Emoji Card</h1>
				<Header>
					<a href="" className="link">
						Made by Athma Vasi
					</a>
					<a href="" className="link">
						View code
					</a>
				</Header>
			</Header>
			<Header>
				<h3>Click on a card and don't click on any more than once!</h3>
			</Header>
		</>
	)
}
