import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function LoginForm(props) {
    // user details state variables set here
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    // send user details to the api endpoint 
    async function registerUser(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:1337/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                password
            }),
        })

        const data = await response.json();
        console.log(data);

        /* If registration successful: Route browser to login page */
        if(data && data.status === "ok") {
            navigate(0);
        }
    }

    async function loginUser(e) {
        e.preventDefault(); 

        const response = await fetch('http://localhost:1337/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json();
        console.log(data);

        /* Retrieve JWT here and route to dashboard */
        if (data && data.user) {
            localStorage.setItem('token', data.user);
            console.log(localStorage.getItem('token'));
            navigate('/');
            navigate(0);
        } else {
            alert('Login Failed');
        }
    }

    if(props.isCreate === true) {
        return (
            <div>
                <h3>Create User</h3>
                <form id="CreateUser" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        placeholder="first name"
                        value={fname}
                        onChange={(e) => {setFname(e.target.value)}}
                    />
                    <br/>
                    <input 
                        type="text" 
                        placeholder="last name"
                        value={lname}
                        onChange={(e) => {setLname(e.target.value)}}   
                    />
                    <br/>
                    <input 
                        type="email" 
                        placeholder="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}   
                    />
                    <br/>
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <br/>
                    <input type="submit"/>
    
                </form>
            </div>
        );
    } else {
        return(
            <div>
                <h3>Sign In</h3>
                <form id="Login" onSubmit={loginUser}>
                    <input 
                        type="email" 
                        placeholder="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}   
                    />
                    <br/>
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }

}

export default LoginForm;
