import React from 'react'
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { storage } from "../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Addim = () => {
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
  
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
      

    };
  
    const handleSubmit = () => {
      const imageRef = ref(storage, `${image.name}`);
      uploadBytes(imageRef, image)
        // .then(() => {
        //   getDownloadURL(imageRef)
        //     .then((url) => {
        //       setUrl(url);
        //     })
        //     .catch((error) => {
        //       console.log(error.message, "error getting the image url");
        //     });
        //   setImage(null);
        // })
        .catch((error) => {
          console.log(error.message);
        });
        // console.log()
        // console.log(image)
        // for (let i = 0 ; i<image.length ; i++){
        //     console.log(image[i])
              
        // } 
    };
  
    return (
      <div className="App">
        <Avatar src={url} sx={{ width: 150, height: 150 }} />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
}

export default Addim











// import React from 'react'
// import Avatar from "@mui/material/Avatar";
// import { useState } from "react";
// import { storage } from "../firebase-config";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Addim = () => {
//     const storage = getStorage();
//     const [image, setImage] = useState(null);
//     const [url, setUrl] = useState("");
//     const [progress, setProgress] = useState(0);

//     const handleChange = e => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     const handleUpload = () => {
//         const uploadTask = ref(storage,`images/${image.name}`).put(image);
//         uploadTask.on(
//             "state_changed",
//             snapshot => {
//                 const progress = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
//                 setProgress(progress);
//             },
//             error => {
//                 console.log(error);
//             },
//             () => {
//                 storage
//                     .ref("images")
//                     .child(image.name)
//                     .getDownloadURL()
//                     .then(url => {
//                         setUrl(url);
//                     });
//             }
//         );
//     };

//     console.log("image: ", image);

//     return (
//         <div>
//             <progress value={progress} max="100" />
//             <br />
//             <br />
//             <input type="file" onChange={handleChange} />
//             <button onClick={handleUpload}>Upload</button>
//             <br />
//             {url}
//             <br />
//             <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
//         </div>
//     );
// };


// export default Addim