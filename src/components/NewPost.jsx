import { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

const NewPost = ({image}) => {
    const { url, width, height } = image;
    const [faces, setFaces] = useState([]);
    const [friends, setFriends] = useState([]);

    const imgRef = useRef()
    const canvasRef = useRef()
  
    const handleImage = async () => {
      const detections = await faceapi
        .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        setFaces(detections.map(item => Object.values(item.box)));

        console.log(detections.map(item => Object.values(item)));
    };

    
    const enter = () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'red';
      faces.map((face) => ctx.strokeRect(...face));
    };
  
    useEffect(() => {
      const loadModels = async () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ])
          .then(handleImage)
          .catch(err => console.log(err));
      }
  
      imgRef.current && loadModels();
    }, []);

    const addFriend = (e) => {
      setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="container">
          <div className="container--left" style={{width, height}}>
              <img ref={imgRef} src={url} crossOrigin='anonymous' alt="" />
              <canvas onMouseEnter={enter} ref={canvasRef} width={width} height={height}/>
              {faces.map((face, i) => (
                <input
                  name={`input${i}`}
                  placeholder='Tag a friend'
                  key={i}
                  className='fiend-input'
                  style={{
                    left: face[0],
                    top: face[1] + face[3] + 10,
                  }}
                  onChange={addFriend}
                />
              ))}
          </div>
          <div className="container--right">
            <h1>Face Detection</h1>
            <input 
                  type='text'
                  placeholder="What's on your mind?"
                  className="post-input right-input" 
            />
            {friends && (
              <div className="friends">
                {Object.values(friends).map((friend, i) => (
                  <div className="friend" key={i}>
                    <img
                      src= "https://www.w3schools.com/howto/img_avatar.png"
                      alt="Avatar"
                      className="avatar right-avatar"
                    />
                    <p className='right-name'>{friend}</p>
                  </div>
                ))}
              </div>
            )}
            <button className='post-btn right-btn'>Post</button>
          </div>
        </div>
    );
}

export default NewPost;