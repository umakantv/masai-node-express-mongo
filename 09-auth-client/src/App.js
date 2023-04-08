import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

const AUTH_TOKEN_KEY = 'auth-token';

function App() {

  const [user, setUser] = useState();

  let search = new URLSearchParams(window.location.search)

  let code = search.get('code');

  let authToken = localStorage.getItem(AUTH_TOKEN_KEY)

  console.log(code);

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:3001/auth/github-signin?code=${code}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const {token} = result.data;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        window.location = '/';

      })
    }

  }, [code])

  useEffect(() => {
    if (authToken) {
      fetch(`http://localhost:3001/auth/loggedInUser`, {
        headers: {
          'authorization': `Bearer ${authToken}`
        }
      })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const user = result.data;

        setUser(user);
      })
    }

  }, [authToken])

  return (
    <div className="App">
      <header className="App-header">
        <img src={user?.image || logo} className="App-logo" alt="logo" />
        <p>
          OAuth Demo with Github
        </p>
        {user ? <button className='button' onClick={() => {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          window.location = '/';
        }}>Logout</button> : <a
          className="App-link"
          href="https://github.com/login/oauth/authorize?client_id=a4aac465ef9ca7723a9a"
        >
          Sign-in with Github
        </a>}
      </header>
    </div>
  );
}

export default App;
