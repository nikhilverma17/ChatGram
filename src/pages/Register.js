import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileNameChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedInputValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    e.target.value = capitalizedInputValue;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer1">
      <div className="formWrapper">
        <span className="logo">Chat Gram</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Profile name"
            onChange={handleProfileNameChange}
          />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <input  style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add Profile Avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Signing You Up...."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
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

export default Register;
