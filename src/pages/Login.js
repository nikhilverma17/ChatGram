import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Gram</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
        <footer>
        <p class="footer"><i class="icon fa-solid fa-copyright fa-lg"></i> 2023 Nikhil Verma. All rights reserved.</p>
        <div class="footer">
          <a href="https://github.com/nikhilverma17" target="_blank"><i
            class="icon1 fa-brands fa-github  fa-lg"></i></a>
          <a href="mailto:iamvermanikhil@gmail.com" target="_blank"><i
            class="icon1 fa-solid fa-envelope fa-lg"></i></a>
          <a href="https://www.linkedin.com/in/nihkil-verma-465848139/" target="_blank"><i
            class="icon1 fa-brands fa-linkedin fa-lg"></i></a>
          <a href="https://twitter.com/thenikhil_verma" target="_blank"><i
            class="icon1 fa-brands fa-twitter fa-lg"></i></a>
          <a href="https://www.instagram.com/thevermanikhil/" target="_blank"><i
            class="icon1 fa-brands fa-instagram fa-lg"></i></a>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Login;