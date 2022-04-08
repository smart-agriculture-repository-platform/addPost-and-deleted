import React, { useState, useEffect, Component } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";

import { useNavigate } from "react-router-dom";
// import Select from 'react-select'
var moment = require('moment');

function CreatePost({ isAuth }) {
  const storage = getStorage();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [tag, setTag] = useState("");
  // const [myDate, setDate] = useState("");
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const [image, setImage] = useState(null);
const [url, setUrl] = useState(null);

const createPost = async () => {
    // ----------------------------------------------------
    // const imageRef = ref(storage, `images/${image.name}`);
    // uploadBytes(imageRef, image)
    //   // .then(() => {
    //   //   getDownloadURL(imageRef)
    //   //     .then((url) => {
    //   //       setUrl(url);
    //   //     })
    //   //     .catch((error) => {
    //   //       console.log(error.message, "error getting the image url");
    //   //     });
    //   //   setImage(null);
    //   // })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

      // ----------------------------------------------------
    let date = moment().format("d/MM/YY Do, h:mm")

    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      tag,
      myDate: date,
      // image: image.name
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

// ---------------------------------------------------

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };
// ---------------------------------------------------

  // const handleSubmit = () => {

  // };



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



            <option>Plant Subsystem</option>
            <option>Fish Subsystem</option>
            <option>Aquatic Animals Subsystem</option>
            <option>Live Stocks Subsystem</option>

          </select>
        </div>


{/* ------------------------------------------------------------ */}
        {/* <input type="file" onChange={handleImageChange} /> */}
{/* ------------------------------------------------------------ */}
      {/* <button onClick={handleSubmit}>Submit</button> */}


        <button onClick={createPost}> Submit Post</button>
      </div>
    </div >
  );
}

export default CreatePost;
