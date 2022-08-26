import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import "antd/dist/antd.css";
import Page from "./pages/post";
import Pages from "./pages/posts";
import UserModal from "./components/userModal";
import { AuthProvider } from "./Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="293042471582-l538fhrii5v1ekg1el3pgk3ur0h6ul87.apps.googleusercontent.com">

      <BrowserRouter>
        <AuthProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h1>Blogster</h1>
            <UserModal />
          </div>
          <Routes>
            <Route path="post/:postId" element={<Page />} />
            <Route path="/" element={<Pages />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}
