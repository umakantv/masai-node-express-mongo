import React, { useState } from 'react';
import RegisterForm from './RegisterForm';

const LoginForm = () => {

    const [email, setEmail] = useState('umakant@example.com')
    const [password, setPassword] = useState('password')
    const [form, setForm] = useState('login');

    function submit() {
        fetch('http://localhost:3002/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            const {data} = res;
            const {token} = data;

            localStorage.setItem('auth-token', token);

            window.location = '/'
        })
        .catch(console.log)
    }

    return ( 
        <>
            {
                form === "login" ?
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /> <br />
                        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /> <br />
                        <button className='button' onClick={submit}>Login</button> <br />
                    </form>
                    <a className="App-link"
                        href="https://github.com/login/oauth/authorize?client_id=36094d9c506d788d6b49">
                        Sign-in with Github
                    </a>
                    <h6 onClick={() => setForm('register')}>Register</h6>
                </div> : 
                <div>
                    <RegisterForm />
                    <h6 onClick={() => setForm('login')}>Login</h6>
                </div>
            }
        </>
     );
}
 
export default LoginForm;