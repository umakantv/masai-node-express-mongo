import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import "antd/dist/antd.css";
import Page from "./pages/post";
import Pages from "./pages/posts";
import { PageHeader } from "antd";
import UserModal from "./components/userModal";
import { AuthProvider } from "./Auth";

export default function App() {
  return (
    <div className="App">

      <AuthProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h1>PT-WEB-04</h1>
          <UserModal />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="post/:postId" element={<Page />} />
            <Route path="/" element={<Pages />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
