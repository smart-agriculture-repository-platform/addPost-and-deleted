import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, QuerySnapshot } from "firebase/firestore";
// import { auth } from "firebase/auth";
import { app, auth, db, provider } from "../firebase-config";
// import { app } from "../firebase/compat/app";
import firebase from 'firebase/compat/app';
import { Link } from "react-router-dom";

function ShowAcc({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  // const postsCollectionRef = firebase.firestore().collection("posts");
  // console.log(auth.currentUser.uid)

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.author.id })))

      // console.log(data.docs.filter(doc => doc.data().author.id === auth.currentUser.uid))
      // console.log(a)
      // setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc })));
      setPostList(data.docs.filter(doc => doc.data().author.id === auth.currentUser.uid).map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    // for ( let i = 0; i < postLists.length; i++) {
    //   // if (postLists[i].age > 25) {
    //   //    result = postLists
    //   //    break
    //     console.log(postLists[i])
    //   // }
    // }
  });

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);

  //     for ( let i = 0; i < (data.docs.map((doc) => ({ ...doc.data(), id: doc }))).length; i++) {
  //       // if (postLists[i].age > 25) {
  //       //    result = postLists
  //       //    break
  //         console.log(data[i])
  //         // }
  //       }
  //       // setPostList("");
  //   };

  //   getPosts();

  // });



  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);

  //     setPostList(postAcc));
  //   };

  //   getPosts();
  // });


  //   useEffect(() => {  
  //     postsCollectionRef.where(author.id, "===",auth.currentUser.uid).onSnapshot((querySnapshot)=>{
  //     const items = [];
  //     querySnapshot.forEach((doc)=>{
  //       items.push(doc.data());
  //     });
  //     setPostList(items);
  //   })


  // });

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  // return (



  //   <div className="userPage">
  //     <div className="text">
  //       <h3 className="Account">Account: {auth.currentUser.displayName}</h3>
  //       <h3 className="Account">Email: {auth.currentUser.email}</h3>

  //       {/* {currentUser && <p>{currentUser.displayName}</p>} */}
  //     </div>
  //     {/* <h1>fsa</h1> */}
  //     {postLists.map((post) => {
  //       // {isAuth && post.author.id === auth.currentUser.uid && (
  //         return (

  //           // {isAuth && post.author.id === auth.currentUser.uid && (
  //         <Link to={`${post.id}`}>
  //         <div className="post">
  //           {/* <h1>{auth.currentUser.uid}</h1> */}
  //           <div className="postHeader">
  //             <div className="title">
  //               <h1> {post.title}</h1>
  //             </div>
  //             <div className="deletePost">
  //               {isAuth && post.author.id === auth.currentUser.uid && (
  //               <button
  //                 onClick={() => {
  //                   deletePost(post.id);
  //                 }}
  //               >
  //                 {" "}
  //                 &#128465;
  //               </button>
  //                )}
  //             </div>
  //           </div>
  //           {/* )} */}
  //           {/* {isAuth && post.author.id === auth.currentUser.uid && ( */}
  //           <div className="postTextContainer"> {post.postText} </div>
  //           {/* )} */}
  //           {/* {isAuth && post.author.id === auth.currentUser.uid && ( */}
  //           <h4>Author: {post.author.name}</h4>
  //           <h4>{post.myDate}</h4>
  //           {/* <h4>{post.author.id}</h4> */}
  //           {/* )} */}
  //         </div>
  //         {/* // )} */}
  //     </Link>
  //         );

  //       })}
  //   </div>


  // );





  return (
    <div className="userPage">
      <div className="text">
        <h3 className="Account">Account: {auth.currentUser.displayName}</h3>
        <h3 className="Account">Email: {auth.currentUser.email}</h3>
      </div>
      {postLists.map((post) => {
        return (
          // <button onClick={shoot}>


          <Link to={`${post?.id}`}>



            <div className="post">
              {/* <h1>{auth.currentUser.uid}</h1> */}
              <div className="postHeader">
                <div className="title">
                  <h1> {post?.title}</h1>
                </div>
                <div className="deletePost">
                  {isAuth && post?.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post?.id);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              {/* )} */}
              {/* {isAuth && post.author.id === auth.currentUser.uid && ( */}
              <div className="postTextContainer"> {post?.postText} </div>
              {/* )} */}
              {/* {isAuth && post.author.id === auth.currentUser.uid && ( */}
              <h4>Author: {post?.author.name}</h4>
              <h4>{post?.myDate}</h4>
              {/* <h4>{post.author.id}</h4> */}
              {/* )} */}
            </div>
            {/* // )} */}

          </Link>
          // </button>
        );
      })}
    </div>
  );

























}

export default ShowAcc;
