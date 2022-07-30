import React, { useEffect, useState } from 'react';
import LetterTile from './LetterTile';
import './wordle.css'

function WordTile(props) {
    // take an input as a word from props
    const [inputWord, setInputWord] = useState(props.inWord);

    useEffect(() => {
        setInputWord(props.inWord);
    }, [props.submit, props.inWord])

    useEffect(() => {
        if(props.submit && inputWord === props.ansWord) {
            alert("CONGRATS! YOU WON")
        }

    }, [props.submit])
    
    return (
        <div className="word-row">
            <div className="letter">
                <LetterTile
                    input={inputWord[0] ?? ''}
                    answer={props.ansWord[0]}
                    ansWord={props.ansWord}
                    submit={props.submit}
                />
            </div>
            <div className="letter">
                <LetterTile
                    input={inputWord[1] ?? ''}
                    answer={props.ansWord[1]}
                    ansWord={props.ansWord}
                    submit={props.submit}
                />
            </div>
            <div className="letter">
                <LetterTile
                    input={inputWord[2] ?? ''}
                    answer={props.ansWord[2]}
                    ansWord={props.ansWord}
                    submit={props.submit}
                />
            </div>
            <div className="letter">
                <LetterTile
                    input={inputWord[3] ?? ''}
                    answer={props.ansWord[3]}
                    ansWord={props.ansWord}
                    submit={props.submit}
                />
            </div>
            <div className="letter">
                <LetterTile
                    input={inputWord[4] ?? ''}
                    answer={props.ansWord[4]}
                    ansWord={props.ansWord}
                    submit={props.submit}
                />
            </div>
        </div>


  );
}

export default WordTile;
