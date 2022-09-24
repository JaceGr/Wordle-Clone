import React, { useState, useEffect } from 'react';
import WordTile from './WordTile';
import {useParams } from 'react-router-dom';

function GameGrid(props) {
    const [input, setInput] = useState('');
    const [guessNum, setGuessNum] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [ansWord, setAnsWord] = useState("     ");

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');

    // Previous result state
    const [prevPlayed, setPrevPlayed] = useState(false);
    const [prevResult, setPrevResult] = useState(0);

    // Get path parameters if they exist for word day
    let { day } = useParams();
    
    // Fetch word from serverside
    useEffect(() => {
        /**
         * Initialise the state of the GameGrid.
         * Check for a previous attempt at this day. Show result if attempted already.
         * If not attempted, fetch the word for the given day and present the game board.
         * @returns No data is returned. Return is only used to stop execution early.
         */
        async function initialise() {
            const result = await loadResult().catch(console.error);
            if(result != null && result > 0) {
                setPrevResult(result);
                setPrevPlayed(true);
                return;
            }

            let word = await loadWord().catch(console.error);
            if(word !== null) {
                console.log(`Word set to: ${word}`);
                setAnsWord(word);
            } else {
                console.log("Todays word cant be fetched.");
            }
        }

        /**
         * Fetch the word for the given day or todays word if no day. 
         * @returns The word for the given day, null otherwise.
         */
        async function loadWord() {
            let response;
            try {
                if(day == null) {
                    response = await fetch('http://localhost:1337/seed/todays-word', {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                } else {
                    response = await fetch(`http://localhost:1337/seed/word/${day}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                }
            } catch (err) {
                console.log(`Unable to contact server: ${err}`);
                return null;
            }

            const status = await response.status;
            if (status === 200) {
                const data = await response.json();
                return data.answer;
            } else {
                return null;
            }
        }

        /**
         * Determine if this days puzzle has been previously attempted. 
         * @returns The number of guesses in a previous attempt. Null if no previous attempts.
         */
        async function loadResult() {
            let response;
            try {
                if(day != null) { 
                    console.log('null');
                    // get the result for the given day.
                    response = await fetch(`http://localhost:1337/results/${day}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                } else {
                    // current day
                    return null;
                }
            } catch (err) {
                console.log(`Unable to contact server: ${err}`);
                return null;
            }

            const status = await response.status;
            if (status === 200) {
                const data = await response.json();
                return data.result;
            } else {
                return null;
            }
        }

        // Call initialise to initialise the wordle grid or show previous attempt.
        initialise().catch(console.error);

    }, [day]);
    

    // useEffect to notify serverside of the game being won or over, each time that the gameNum is updated check. 
    // if gameNum == 6 then send that the game is over. 

    const isCharLetter = (input) => {
        if(input.length > 1) {
            return false;
        }
        return (input.toUpperCase() !== input.toLowerCase());
    }

    const checkAnswer = () => {
        if(input === ansWord) {
            setGameWon(true)
        }
        return;
    }

    const handleKey = (e) => {
        console.log('starting handleKey', e.key);
        // check if the game has been won
        if(gameWon) {
            return;
        }

        // check for enter here
        //submit the input if enter is pressed and there are five characters input.
        if(e.keyCode === 13 && input.length === 5) {
            console.log('inside enter')
            checkAnswer();

            switch(guessNum) {
                case 0:
                    setInput1(input)
                    break;
                case 1:
                    setInput2(input)
                    break;
                case 2:
                    setInput3(input)
                    break;
                case 3:
                    setInput4(input)
                    break;
                case 4:
                    setInput5(input)
                    break;
                case 5:
                    setInput6(input)
                    break;
                default:
                    // throw exception here as this shouldnt be reached.
                    break;
            }
            setGuessNum(guessNum + 1);
            setInput("");

            return;
        }

        // check for delete here
            //remove the last letter of input when this happens
        if(e.keyCode === 8) {
            console.log('inside deleting')
            setInput(input.slice(0, -1))
            return;
        }

        if(isCharLetter(e.key) && input.length < 5) {
            console.log('inside a letter', e.key)
            // handleLetter(e.key)
            // if input1 has more than 5 characters return
            setInput(input.concat(e.key.toUpperCase()))
        } 
    }

    /**
     * Create the string to show to a user when they have completed this level.  
     * @returns Congratulation message if finished successfully or better luck next time if not.
     */
    const getPrevResultMessage = () => {
        if(prevResult === 0 ) {
            return null;
        } else if(prevResult < 7) {
            return `You have already played this day! You finished it in ${prevResult} attempts`;
        } else {
            return 'You were unable to successfully complete this level. Better luck next time!'
        }
    }

    document.onkeyup = handleKey;
    // document.addEventListener('keyup', handleKey);

    return (
        <div className="App-body">
            {!prevPlayed && <div>
                <WordTile 
                    submit={guessNum > 0 } 
                    inWord={guessNum === 0 ? input : input1}
                    ansWord={ansWord} />
                <WordTile 
                    submit={guessNum > 1} 
                    inWord={guessNum === 1 ? input : input2}
                    ansWord={ansWord} />
                <WordTile 
                    submit={guessNum > 2} 
                    inWord={guessNum === 2 ? input : input3}
                    ansWord={ansWord} />
                <WordTile 
                    submit={guessNum > 3} 
                    inWord={guessNum === 3 ? input : input4}
                    ansWord={ansWord} />
                <WordTile 
                    submit={guessNum > 4} 
                    inWord={guessNum === 4 ? input : input5}
                    ansWord={ansWord} />
                <WordTile 
                    submit={guessNum > 5} 
                    inWord={guessNum === 5 ? input : input6}
                    ansWord={ansWord} />
                {/* Buttom here to submit */}
            </div>}
            {prevPlayed && <div>
                {getPrevResultMessage()}
            </div>}
        </div>
    );
}

export default GameGrid;
