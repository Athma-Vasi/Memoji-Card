import Wrapper from './components/styled-generics/Wrapper'
import AppHeader from './components/appHeader'
import ScoreBoard from './components/scoreBoard'
import GameBoard from './components/gameBoard'

import { ThemeState, State, Action } from './types'
import { randomSliceOfEmojis, reducer } from './helperFunctions'

import { emojisData } from './emojisData'
import { useReducer } from 'react'
import { GlobalStyle } from './styles/global'

const themeState: ThemeState = {
	colour: {
		light: 'hsl(0, 0%, 25%)',
		dark: 'hsl(0, 0%, 75%)',
	},
	backgroundColour: {
		light: 'hsl(0, 0%, 97%)',
		dark: 'hsl(0, 0%, 11%)',
	},
}

const initialState: State = {
	allEmojis: randomSliceOfEmojis(emojisData),
	clickedEmojis: new Set(),
	score: 0,
	level: 1,
	highScore: JSON.parse(localStorage.getItem('highScore') ?? '0'),
	isGameRunning: true,
	isDarkMode: false,
	isHardMode: false,
	themeState: themeState,
}

const action: Action = {
	cardClick: 'cardClick',
	updateAllEmojis: 'updateAllEmojis',
	updateClickedEmojis: 'updateClickedEmojis',
	updateScore: 'updateScore',
	updateLevel: 'updateLevel',
	updateHighScore: 'updateHighScore',
	toggleIsGameRunning: 'toggleIsGameRunning',
	toggleTheme: 'toggleTheme',
	toggleHardMode: 'toggleHardMode',
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState)

	const colour = state.isDarkMode
		? state.themeState.colour.dark
		: state.themeState.colour.light
	const backgroundColour = state.isDarkMode
		? state.themeState.backgroundColour.dark
		: state.themeState.backgroundColour.light

	return (
		<div>
			<GlobalStyle colour={colour} backgroundColour={backgroundColour} />
			<Wrapper colour={colour} backgroundColour={backgroundColour}>
				<AppHeader state={state} dispatch={dispatch} action={action}></AppHeader>
				<ScoreBoard state={state} dispatch={dispatch} action={action}></ScoreBoard>
				<GameBoard state={state} dispatch={dispatch} action={action}></GameBoard>
			</Wrapper>
		</div>
	)
}

export default App
