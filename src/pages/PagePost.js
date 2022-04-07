import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutPage from "./LayoutPage";
import { addDoc, getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";


var moment = require('moment');

const PagePost = ({ isAuth }) => {
    // const [postLists, setPostList] = useState([]);
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const { postId } = useParams();



    const [postText, setPostText] = useState("");
    // const [myDate, setDate] = useState("");



    const [commentsLists, setCommentsList] = useState([]);
    const commentsCollectionRef = collection(db, "comment");
    let navigate = useNavigate();

    const createPost = async () => {
        let date = moment().format("d/MM/YY Do, h:mm")
        await addDoc(commentsCollectionRef, {
            id: postId,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            myDate: date
        });
        // navigate("/");
        refreshPage();
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);
    // /user/post/

    // ----------------------------------
    // const getPosts = async (postId) => {
    //     const data = await getDocs(postsCollectionRef);
    //   // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //   //   setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   setPostList(data.docs.filter(doc => doc.data().id === postId).map((doc) => ({ ...doc.data(), id: doc })));
    //   };

    // useEffect(() => {
    //     getPosts(postId);

    //   }, [postId]);
    // ----------------------------------------------------


    // useEffect(() => {
    //     const getPosts = async () => {
    //       const data = await getDocs(postsCollectionRef);
    //       setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };

    //     console.log("1")
    //     getPosts();
    //   });

    // -------------------------------------------------------------
    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.filter(doc => doc.id === postId).map((doc) => ({ ...doc.data(), id: doc })));

        };

        const getComments = async () => {
            const dataComments = await getDocs(commentsCollectionRef);
            setCommentsList(dataComments.docs.filter(doc => doc.data().id === postId).map((doc) => ({ ...doc.data(), id: doc.id })));

        };

        console.log("1")
        console.log(commentsLists)
        getComments()
        getPosts();
    });
    const commentElements = commentsLists.map(comment => {
        return (
            //   <div key={comment.id}>
            <div >
                {/* <p>{comment.id}</p> */}
                <h2>{comment.postText}</h2>
                <h5>{comment.author.name}</h5>
                <h6>{comment.myDate}</h6>

                <hr />
            </div>
        );
    });

    return (
        <div>
            {postLists.map((post) => {
                return (
                    <LayoutPage>
                        <div className="postTextSingle">
                            <h1>{post.title}</h1>
                            <h2>{post.postText} </h2>
                        </div>
                        <p>{post.author.name}</p>


                        {/* <h4>{commentArray.length} Comments</h4> */}
                        <h4>{post.myDate}</h4>
                        <hr />
                        <h4>{commentsLists.length} Comments</h4>
                        <hr />
                        {commentElements}


                        <div className="createPostPage">
                            <div className="cpContainer">
                                <h1>Create A Comment</h1>
                                <div className="inputGp">
                                    <label> Comment:</label>
                                    <textarea
                                        placeholder="Post..."
                                        onChange={(event) => {
                                            setPostText(event.target.value);
                                        }}
                                    />
                                </div>
                                <button onClick={createPost}> Submit Post</button>
                            </div>
                        </div >

                    </LayoutPage>

                );

            }

                // commentsLists

            )}
        </div>

    );

}

export default PagePost;