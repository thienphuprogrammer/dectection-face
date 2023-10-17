import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'


function App() {
  const [file, setFile] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    const getImage = async () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height
        });
      };
    };

    file && getImage()
  }, [file]);

  return (
      <div>
        <Navbar />
        {image ? (
          <NewPost image={image} />
        ) : (
          <div className="new-post-card">
            <div className="add-post">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
                className="avatar"
              />
              <div className="post-form">
                <input
                  type='text'
                  className="post-input"
                  placeholder="What's on your mind?"
                />
                <label htmlFor='file' className="custom-file-upload">
                  <img
                    className="add-img"
                    src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                    alt=""
                  />
                  <img
                    className="add-img"
                    src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                    alt=""
                  />
                  <img
                    className="add-img"
                    src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                    alt=""
                  />
                  <button className="post-btn">Post</button>
                </label>
                <input 
                  id='file' 
                  type='file'
                  className="post-input" 
                  style={{display: 'none'}}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
