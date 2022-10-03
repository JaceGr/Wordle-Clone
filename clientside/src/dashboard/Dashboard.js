import '../App.css';
import React, { useState, useEffect } from 'react';
import ResultTile from './ResultTile';

// import * as jwt from 'jsonwebtoken'


function Dashboard() {
    const [user, setUser] = useState(null);

    const [average, setAverage] = useState(null);
    const [wins, setWins] = useState(null);
    const [games, setGames] = useState(null);
    
    // Assuming user is logged in the jwt will be accessable
    useEffect(() => {
        
        // set User for displaying on dashboard.
        const token = localStorage.getItem('token');
        if(token) {
            setUser(token);
        }
        else {
            setUser("Not logged in");
        }

        /**
         * Retrieve result information for dashboard. 
         * @returns 
         */
        const getDashboardResults = async () => {

            let response;
            try {
                response = await fetch(`http://localhost:1337/results/dashboard`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
            } catch (err) {
                console.log(`Unable to contact server: ${err}`);
                return null;
            }

            const status = await response.status;
            if (status === 200) {
                const data = await response.json();
                //set state for dashboard results.
                setAverage(data.average);
                setGames(data.games);
                setWins(data.wins);
            } else {
                return null;
            }
        }

        // Call initialise to initialise the wordle grid or show previous attempt.
        getDashboardResults().catch(console.error);

        }, []);


  return (
      <div>
        <div className="App-body">
            <h1>Dashboard</h1>
            <div className="card-container">
                <ResultTile 
                    label="Wins"
                    score={wins}
                    explanation="Number of completed games"
                />
                <ResultTile
                    label="Games"
                    score={games}
                    explanation="Number of attempted games"
                />
                <ResultTile
                    label="Average"
                    score={average}
                    explanation="Total number of attempts : Win ratio"/>
            </div>

        </div>
      </div>
  );
}

export default Dashboard;
