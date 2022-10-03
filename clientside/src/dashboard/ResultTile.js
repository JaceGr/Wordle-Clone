import React from 'react';
import './Dashboard.css';

const ResultTile = ({label, score, explanation, scale}) => {
    return (
        <div className="result-tile">
            <h3 className="result-label">{label}</h3>
            <h1 className="result-score">{Math.round(score * 10) / 10}</h1>
            <p className="result-explanation">{explanation}</p>
        </div>
    )
}

export default ResultTile;