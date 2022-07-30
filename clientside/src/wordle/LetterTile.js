// takes the user input letter, wether it is correct or not, the real letter and whether the word has been guessed yet.
import React, { useEffect, useState } from 'react';
import './wordle.css'

function LetterTile(props) {
    //prop for input letter
    // prop used for correct letter 
    // prop of the whole word (check if letter in word after checking the correct letter)
    // prop used for submitted 
    const [letCorrect, setLetCorrect] = useState(0); //0 unanswere, 1 incorrect, 2 correct

    const [style, setStyle] = useState({
        'backgroundColor':'grey',
        'height':'80px',
        'width':'80px',
        'textAlign':'center',
        'verticalAlign':'middle',
        'lineHeight':'80px'
    });

    useEffect( () => {
        if( props.submit && props.input === props.answer) {
            setLetCorrect(2);
            setStyle({
                'backgroundColor':'green',
                'height':'80px',
                'width':'80px',
                'textAlign':'center',
                'verticalAlign':'middle',
                'lineHeight':'80px',
            })
        } else if (props.submit && props.ansWord.includes(props.input)){
            setLetCorrect(1);
            setStyle({
                'backgroundColor':'orange',
                'height':'80px',
                'width':'80px',
                'textAlign':'center',
                'verticalAlign':'middle',
                'lineHeight':'80px',
            })
        } else if (props.submit && props.input !== props.answer){
            setLetCorrect(1);
            setStyle({
                'backgroundColor':'black',
                'height':'80px',
                'width':'80px',
                'textAlign':'center',
                'verticalAlign':'middle',
                'lineHeight':'80px',
            })
        } else {
            setLetCorrect(0);
            setStyle({
                'backgroundColor':'grey',
                'height':'80px',
                'width':'80px',
                'textAlign':'center',
                'verticalAlign':'middle',
                'lineHeight':'80px'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.submit]);

    //need to change the styling back when 
    
    return (
            <div style={style} className="letter-one">{props.input} </div>
            //add back in style

  );
}

export default LetterTile;
