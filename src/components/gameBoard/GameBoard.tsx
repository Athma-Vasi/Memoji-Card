import Container from '../styled-generics/Container'
import Card from '../styled-generics/Card'
import Wrapper from '../styled-generics/Wrapper'

import { emojisData } from '../../emojisData'

import { EmojisArr, State, Dispatch, Action, Emoji } from '../../types'

import { randomSliceOfEmojis } from '../../helperFunctions'
import Button from '../styled-generics/Button'

function GameBoard({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	function handleCardClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		const amountOfCards = state.level * 6

		//if size of the emojis set is one less than amount of cards displayed,
		//then increase the level
		if (state.clickedEmojis.size === amountOfCards - 1) {
			//first updating everything except allEmojis because its value is set to the
			//return value of the randomSliceOfEmojis function which takes updated level
			dispatch({
				type: action.cardClick,
				payload: {
					allEmojis: state.allEmojis,
					clickedEmojis: new Set(),
					score: (state.score += 1),
					level: (state.level += 1),
					highScore: state.highScore,
					isGameRunning: true,
					isDarkMode: state.isDarkMode,
					isHardMode: state.isHardMode,
					themeState: state.themeState,
				},
			})

			//uppdating allEmojis with the updated level value
			dispatch({
				type: action.updateAllEmojis,
				payload: {
					allEmojis: randomSliceOfEmojis(emojisData, state.level),
				},
			})
		}
		//player has not lost and level is not increased
		else {
			//shuffle the displayed array of emojis
			const shuffledArray = (function (arr: EmojisArr | undefined): EmojisArr {
				let clone = structuredClone(arr)

				for (let i = clone.length - 1; i > 0; i -= 1) {
					const j = Math.floor(Math.random() * (i + 1))
					;[clone[i], clone[j]] = [clone[j], clone[i]]
				}

				return clone
			})(state.allEmojis)

			const emoji = ev.currentTarget.dataset.emoji ?? ''

			//if the clicked emoji is not in the set of clicked emojis, update state
			if (!state.clickedEmojis.has(emoji)) {
				dispatch({
					type: action.cardClick,
					payload: {
						allEmojis: shuffledArray,
						clickedEmojis: state.clickedEmojis.add(emoji),
						score: (state.score += 1),
						level: state.level,
						highScore: state.highScore,
						isGameRunning: true,
						isDarkMode: state.isDarkMode,
						isHardMode: state.isHardMode,
						themeState: state.themeState,
					},
				})
			}
			//player has lost by clicking on the same emoji twice
			//store score if it is highScore, reset displayed emojis to level one,
			//reset score, reset clicked emojis, clear uniqueRandomIndexes in localstorage,
			//and update state
			else {
				storeHighScore(state.score)

				dispatch({
					type: action.cardClick,
					payload: {
						allEmojis: randomSliceOfEmojis(emojisData),
						clickedEmojis: new Set(),
						score: (state.score = 0),
						level: state.level,
						highScore: state.highScore,
						isGameRunning: true,
						isDarkMode: state.isDarkMode,
						isHardMode: state.isHardMode,
						themeState: state.themeState,
					},
				})

				dispatch({
					type: action.toggleIsGameRunning,
					payload: {
						isGameRunning: false,
					},
				})
			}
		}
	}

	function storeHighScore(score_: number): void {
		if (!localStorage.getItem('highScore')) {
			localStorage.setItem('highScore', JSON.stringify(score_))
		}

		const storageHighScore: number = JSON.parse(localStorage.getItem('highScore') ?? '0')

		if (score_ > storageHighScore) {
			localStorage.setItem('highScore', JSON.stringify(score_))

			dispatch({
				type: action.updateHighScore,
				payload: {
					highScore: score_,
				},
			})
		}
	}

	function handlePlayAgainBttnClick(
		ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void {
		dispatch({
			type: action.cardClick,
			payload: {
				allEmojis: randomSliceOfEmojis(emojisData),
				clickedEmojis: new Set(),
				score: 0,
				level: 1,
				highScore: JSON.parse(localStorage.getItem('highScore') ?? '0'),
				isGameRunning: true,
				isDarkMode: state.isDarkMode,
				isHardMode: state.isHardMode,
				themeState: state.themeState,
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
		<Container colour={colour} backgroundColour={backgroundColour}>
			{!state.isGameRunning && (
				<Wrapper colour={colour} backgroundColour={backgroundColour}>
					<Container colour={colour} backgroundColour={backgroundColour}>
						<h3 data-cy="game-lossText" style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}>
							Wow! 🤩 That's a great score! Try to beat your best! ✺◟(＾∇＾)◞✺
						</h3>
						<Button
							colour={colour}
							backgroundColour={backgroundColour}
							onClick={handlePlayAgainBttnClick}
							data-cy="bttn-playAgain"
						>
							Play again!
						</Button>
					</Container>
				</Wrapper>
			)}
			{state.isGameRunning &&
				state.allEmojis?.map((emoji: Emoji, index: number) => {
					let emojiName = emoji.unicodeName.split(' ')[0].includes('E')
						? emoji.unicodeName.split(' ').slice(1).join(' ')
						: emoji.unicodeName
					emojiName = `${emojiName[0].toUpperCase()}${emojiName.slice(1)}`
					emojiName.length > 30 && (emojiName = emojiName.slice(0, 30) + '...')

					return (
						<div key={index}>
							<Card
								colour={colour}
								backgroundColour={backgroundColour}
								onClick={handleCardClick}
								data-emoji={emoji.character}
								data-cy="emoji-card"
							>
								<div
									style={{
										fontSize: 'clamp(4rem, 6vw, 9rem)',
									}}
								>
									{emoji.character}
								</div>
								{!state.isHardMode && (
									<p
										data-cy="emoji-unicodeName"
										style={{
											fontSize: 'clamp(1.25rem, 1.75vw, 2rem)',
										}}
									>
										{emojiName}
									</p>
								)}
							</Card>
						</div>
					)
				})}
		</Container>
	)
}

export default GameBoard
