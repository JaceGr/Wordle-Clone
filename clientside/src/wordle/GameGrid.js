import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
import WordTile from './WordTile';

function GameGrid(props) {
    const [input, setInput] = useState('');
    const [guessNum, setGuessNum] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const ansWord = "TOURS";

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');

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

    document.onkeyup = handleKey;
    // document.addEventListener('keyup', handleKey);

    return (
        <div className="App-body">
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
            
        </div>
    );
}

export default GameGrid;
