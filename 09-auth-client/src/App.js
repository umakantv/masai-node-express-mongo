import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"
import LoginForm from './LoginForm';

const AUTH_TOKEN_KEY = 'auth-token';

function App() {

  const [user, setUser] = useState(null);

  let search = new URLSearchParams(window.location.search)
  let code = search.get('code');

  let authToken = localStorage.getItem(AUTH_TOKEN_KEY)

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:3002/api/auth/github-signin/${code}`)
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        const {token} = result.data;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        window.location = '/';

      })
    }

  }, [code])

  useEffect(() => {
    if (authToken) {
      fetch(`http://localhost:3002/api/auth/loggedInUser`, {
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
        { 
          user ? 
          <div>
            <h3>{user.name}</h3>
            <button className='button' onClick={() => {
              localStorage.removeItem(AUTH_TOKEN_KEY);
              window.location = '/';
            }}>
              Logout
            </button> 
          </div> :
          <LoginForm />
        }

      </header>
    </div>
  );
}

export default App;
