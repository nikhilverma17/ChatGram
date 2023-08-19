import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [inputValue, setInputValue] = useState(""); // Store the current input value
  const [suggestions, setSuggestions] = useState([]); // Store the suggestions
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleInputChange = async (value) => {
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter
    setInputValue(capitalizedValue);
  
    const q = query(collection(db, "users"), where("displayName", "==", capitalizedValue));
    try {
      const querySnapshot = await getDocs(q);
      const userSuggestions = querySnapshot.docs.map((doc) => doc.data().displayName);
      setSuggestions(userSuggestions);
    } catch (error) {
      console.error("Error searching user:", error);
      setSuggestions([]);
    }
  };
  
  

  const handleSearch = async () => {
    setLoading(true);
    const q = query(collection(db, "users"), where("displayName", "==", inputValue));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser(userDoc.data());
        setErr(false);
      } else {
        setUser(null);
        setErr(true);
      }
    } catch (error) {
      console.error("Error searching user:", error);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setInputValue(selectedSuggestion); // Populate the input field with the selected suggestion
    setSuggestions([]); // Clear suggestions
    handleSearch(); // Perform search as if the user pressed Enter
  };

  const handleSelect = async () => {
    if (!user) {
      return;
    }

    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (!chatDocSnapshot.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }

    setUser(null);
    setInputValue("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => handleInputChange(e.target.value)}
          value={inputValue}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && <span>Loading...</span>}
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL || ""} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;