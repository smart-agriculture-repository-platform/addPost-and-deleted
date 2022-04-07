import React, { useState, useEffect, Component } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
// import Select from 'react-select'
var moment = require('moment');

function CreatePost({ isAuth }) {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [tag, setTag] = useState("");
  // const [myDate, setDate] = useState("");
  
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    let date = moment().format("d/MM/YY Do, h:mm")
    
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      tag,
      myDate: date
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}

          />
        </div>
        <div className="inputGp">
          {/* <label> Post:</label> */}

          <select value={tag}  
          onChange={e => 
              setTag(e.target.value)}>
            {/* // placeholder="Tag..."
            // onChange={(event) => { */}
            {/* //   setTag(event.options);
            // }} */}



          <option>chocolate</option>
          <option>strawberry</option>
          <option>vanilla</option>
          <option>chocolate</option>
          <option>strawberry</option>
          
        </select>
      </div>
      <div className="">
        <input type="file" id="file-input" name="ImageStyle" />
      </div>
      <button onClick={createPost}> Submit Post</button>
    </div>
    </div >
  );
}

export default CreatePost;
