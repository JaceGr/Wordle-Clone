import React, { useState } from 'react';
import WordTile from './WordTile';
import TopBar from '../TopBar';

function GameGrid(props) {
    const [submit1, setSubmit1] = useState(false);
    const [input1, setInput1] = useState('');

    const isCharLetter = (input) => {
        if(input.length > 1) {
            return false;
        }
        return (input.toUpperCase() !== input.toLowerCase());
    }

    const handleKey = (e) => {
        console.log('starting handleKey', e.key);
        // check for enter here
            //check if it is 5 characters
            //submit the input
        if(e.keyCode === 13) {
            console.log('inside enter')
            setSubmit1(true);
            return;
        }

        // check for delete here
            //remove the last letter of input when this happens
        if(e.keyCode === 8) {
            console.log('inside deleting')
            setInput1(input1.slice(0, -1))
            return;
        }

        if(isCharLetter(e.key)) {
            console.log('inside a letter', e.key)
            // handleLetter(e.key)
            // if input1 has more than 5 characters return
            setInput1(input1.concat(e.key.toUpperCase()))
        } 
    }

    document.onkeyup = handleKey;
    // document.addEventListener('keyup', handleKey);

    return (
        <div className="App-body">
            <WordTile 
                submit={submit1} 
                inWord={input1}
                ansWord="WOKEN" />
            {/* Buttom here to submit */}
            
        </div>
    );
}

export default GameGrid;
