import { Header } from '../styled-generics/Header'
import { State, Dispatch, Action } from '../../types'
import Button from '../styled-generics/Button'

function ScoreBoard({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	function handleDifficultyClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		ev.currentTarget.textContent =
			ev.currentTarget.textContent === 'Hard mode' ? 'Easy mode' : 'Hard mode'

		dispatch({
			type: action.toggleHardMode,
			payload: {
				isHardMode: ev.currentTarget.textContent === 'Hard mode' ? false : true,
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
		<Header
			style={{
				justifyContent: 'space-between',
			}}
		>
			<h3 data-cy="highscore">Highscore: {state.highScore}</h3>
			<h3 data-cy="score">Score: {state.score}</h3>
			<Button
				colour={colour}
				backgroundColour={backgroundColour}
				onClick={handleDifficultyClick}
				data-cy="bttn-hardMode"
			>
				Hard mode
			</Button>
		</Header>
	)
}

export default ScoreBoard
