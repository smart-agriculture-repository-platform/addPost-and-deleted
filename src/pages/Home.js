import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
// import Input from "react-select/dist/declarations/src/components/Input";

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

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="homePage">
      <div className="search">
      <input 
      type="text"
      placeholder="Search..."
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      /></div>
      {postLists.filter((post) =>{
        if(searchTerm == ""){
          return (
          <Link to={`${post.id}`}>



          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post?.title}</h1>
                <h3>tag: {post?.tag}</h3>
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
          
            <h6>{post?.author.name}</h6>
            <h6>{post?.myDate}</h6>
          </div>

          </Link>
          )
        } else if (post?.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
          return (
            
            <div className="post" >
             <Link to={`${post.id}`}>
 
 
 
             <div className="postHeader">
               <div className="title" >
                 <h1> {post?.title}</h1>
                 <h3>tag: {post?.tag}</h3>
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
           
             <h6>{post?.author.name}</h6>
             <h6>{post?.myDate}</h6>
 
           </Link>
           </div>
           )
                    }
        
       
      }).map((post, key)=>{
          return (
            
           <div className="post" key ={key}>
            <Link to={`${post.id}`}>



            <div className="postHeader">
              <div className="title" >
                <h1> {post?.title}</h1>
                <h3>tag: {post?.tag}</h3>
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
          
            <h6>{post?.author.name}</h6>
            <h6>{post?.myDate}</h6>

          </Link>
          </div>
          )
        })
      // {postLists.map((post) => {

      //   return (
          
      //     <button onClick={shoot}>
          
      // </button>
        // );
      }
    </div>
  );
}

export default Home;
