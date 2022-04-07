import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    console.log("1")
    getPosts();
  });
  const shoot = () => {
    alert("Great Shot!");
  }

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          // <button onClick={shoot}>
          <Link to={`${post.id}`}>



          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
                <h3>tag: {post.tag}</h3>
              </div>


              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
          
            <h4>@{post.author.name}</h4>
            <h4>{post.myDate}</h4>
          </div>

          </Link>
      // </button>
        );
      })}
    </div>
  );
}

export default Home;
