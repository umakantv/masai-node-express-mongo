import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleOAuth from './component/OAuth/Google';

function App() {
  return (
    <GoogleOAuthProvider clientId="329075112805-qaq4s71516p5b52vgo6smr2n1skb6178.apps.googleusercontent.com">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <GoogleOAuth />
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
