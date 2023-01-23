import './App.css';
import { Routes, Route, BrowserRouter as Router, Outlet } from "react-router-dom";
import Layout from './components/Layout';
import { AuthContextProvider } from './contexts/auth';
import Login from './components/Auth/Login';
import GithubSignin from './components/Pages/GithubSignin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (<>
    <ToastContainer />
    <AuthContextProvider>
      <Router>
      <div className="App">
        <Login />
        <Layout>
          <Routes>
            <Route path="/" element={<DummyLayout />}>
              <Route path='github-signin' element={<GithubSignin />} />
            </Route>

          </Routes>
        </Layout>
      </div>
      </Router>
    </AuthContextProvider>
    </>
  );
}

function DummyLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default App;
