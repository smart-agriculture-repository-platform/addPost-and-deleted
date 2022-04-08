import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutPage from "./LayoutPage";
import { addDoc, getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";


import Avatar from "@mui/material/Avatar";
import { storage } from "../firebase-config";
import { getStorage, getMetadata, ref, uploadBytes, getDownloadURL } from "firebase/storage";


var moment = require('moment');

const PagePost = ({ isAuth }) => {
    const storage = getStorage();
    const [url, setUrl] = useState(null);

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
        navigate(`/posts/${postId}`);
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
    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.filter(doc => doc.id === postId).map((doc) => ({ ...doc.data(), id: doc })));

        // console.log(postLists[0].image)


        // let fileName = postLists[0].image;
        // // const listRef = ref(storage, `images/${postLists[0].image}`);
        // // const listRef = ref(storage, "images/11a5eee35a594f97b8847917071ef29c.png");
        // const listRef = ref(storage, `images/${fileName}`);

        // // const spaceRef   = ref(storage, fileName);
        // // getDownloadURL(imageRef)
        // // .then((url) => {
        // //   setUrl(url);
        // // })

        // // getMetadata(listRef)
        // getDownloadURL(listRef)
        //     .then((url) => {
        //         setUrl(url);
        //         // Metadata now contains the metadata for 'images/forest.jpg'
        //     })
        //     .catch((error) => {
        //         console.log(error.message, "error getting the image url");
        //     });

    };
    const getComments = async () => {
        const dataComments = await getDocs(commentsCollectionRef);
        setCommentsList(dataComments.docs.filter(doc => doc.data().id === postId).map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getComments()
        getPosts();
    });
    const commentElements = commentsLists.map(comment => {
        return (
            //   <div key={comment.id}>
            <div >
                {/* <p>{comment.id}</p> */}
                <h2>{comment?.postText}</h2>
                {/* <Avatar src={url} sx={{ width: 30, height: 30 }} /> */}
                <h4>{comment?.author.name}</h4>
                <h4>{comment?.myDate}</h4>

                <hr />
            </div>
        );
    });

    const postElements = postLists.map(post => {
        return (
            <div>

                <div className="postTextSingle">
                    <h1>{post?.title}</h1>
                    <h2>{post?.postText} </h2>
                    {/* <Avatar src={url} sx={{ width: 150, height: 150 }} /> */}
                </div>
                {/* <br></br> */}
                <p>{post?.author.name}</p>
                {/* <p>{post?.image}</p> */}

                <h4>{post?.myDate}</h4>
                <hr />
                <h4>{commentsLists?.length} Comments</h4>
                <hr />
              



            </div>

        );
    });


    return (
        <div>
            {/* {postLists.map((post) => { */}
            <LayoutPage>




                {postElements}


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

            {/* } */}

            {/* // commentsLists */}

            {/* )} */}
        </div>

    );

}

export default PagePost;