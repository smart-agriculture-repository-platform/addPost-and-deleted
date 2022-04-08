import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import ShowAcc from "./pages/ShowAcc";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import PagePost from '../src/pages/PagePost';
import Addim from '../src/pages/Addim';



function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/posts"> Home </Link>

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        )
          : (
            <>

              <Link to="/createpost"> Create Post </Link>
              <Link to="/user"> Account </Link>
              <button onClick={signUserOut}> Log Out</button>

            </>




          )}
      </nav>




      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/posts" element={<Home isAuth={isAuth} />} />
        <Route path="/a" element={<Addim isAuth={isAuth} />} />
        <Route path="/detail" element={<Detail isAuth={isAuth} />} />
        <Route path="/user" element={<ShowAcc isAuth={isAuth} />} />
        <Route path="posts/:postId" element={<PagePost isAuth={isAuth} />} />
        <Route path="/:postId" element={<PagePost isAuth={isAuth} />} />
        <Route path="user/:postId" element={<PagePost isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>






  );
}

export default App;
