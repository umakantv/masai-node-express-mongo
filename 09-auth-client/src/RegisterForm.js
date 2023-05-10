import React, { useState } from 'react';

const RegisterForm = () => {

    const [name, setName] = useState('umakant@example.com')
    const [email, setEmail] = useState('umakant@example.com')
    const [password, setPassword] = useState('password')

    function submit() {
        fetch('http://localhost:3002/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name, email, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            const {data} = res;

            window.location = '/'
        })
        .catch(console.log)
    }

    return ( 
        <form onSubmit={(e) => {
            e.preventDefault()
        }}>
            <input type="name" placeholder="name" onChange={(e) => setName(e.target.value)} /> <br />
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /> <br />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /> <br />
            <button className='button' onClick={submit}>Register</button> <br />
        </form>
     );
}
 
export default RegisterForm;