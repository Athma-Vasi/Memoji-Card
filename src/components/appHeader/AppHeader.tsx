import Button from '../styled-generics/Button'
import { Header } from '../styled-generics/Header'
import { Action, Dispatch, State } from '../../types'
import { BsSun, BsMoonFill } from 'react-icons/bs'

export default function AppHeader({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	function handleToggleThemeClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		// ev.currentTarget.textContent = ev.currentTarget.textContent === '🌑' ? '☀️' : '🌑'

		dispatch({
			type: action.toggleTheme,
			payload: {
				isDarkMode: state.isDarkMode ? false : true,
			},
		})
	}

	const colour = state.isDarkMode
		? state.themeState.colour.dark
		: state.themeState.colour.light
	const backgroundColour = state.isDarkMode
		? state.themeState.backgroundColour.dark
		: state.themeState.backgroundColour.light

	return (
		<Header>
			<h1
				style={{
					fontSize: 'clamp(2rem, 4vw, 6rem)',
				}}
			>
				Memoji Card
			</h1>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '62%',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						width: '62%',
						justifyContent: 'space-around',
						fontSize: 'clamp(1rem, 2vw, 3rem)',
						gap: 'clamp(1rem, 2vw, 3rem)',
					}}
				>
					<a href="https://github.com/Athma-Vasi" className="link">
						Made by Athma Vasi
					</a>
					<a href="https://github.com/Athma-Vasi/Memory-Card" className="link">
						View code
					</a>
				</div>

				<Button
					colour={colour}
					backgroundColour={backgroundColour}
					type="button"
					data-cy="bttn-toggleTheme"
					onClick={handleToggleThemeClick}
				>
					{state.isDarkMode ? <BsMoonFill size={30} /> : <BsSun size={30} />}
				</Button>
			</div>
		</Header>
	)
}
