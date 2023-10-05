import { useEffect, useState } from "react";
import VideoFeed from "./VideoFeed";
import PocketBase from 'pocketbase';
import html2canvas from 'html2canvas';
import '../App.css'
import { useNavigate } from "react-router-dom";
import { textTweet } from "../Twitter/Twitter";


/**
 * fonction composant pour afficher le flux vidéo, prendre un screenshot
 * et envoyer le screenshot à la base de données 
 */
export default function Camera() {

  const pb = new PocketBase('http://127.0.0.1:8090');

  const navigate = useNavigate();
  
  const [image, setImage] = useState(null)
  const [blob, setBlob] = useState()
  const [userId, setUserId] = useState();
  const myForm = new FormData()
  
  /**
   * fonction asynchrone pour prendre un screenshot à partir d'une balise html
   */
  const screenshot = () => {
    html2canvas(document.getElementById("videoFeed")).then(canvas => {
      let url = canvas.toDataURL()
      setImage(url)
      canvas.toBlob((blob) => {
        setBlob(blob)
      })
      
    });
  }

  /**
   * fonction asynchrone pour envoyer l'image à la base de données et rediriger
   * vers la page de gestion de l'image
   */
  const proceed = async() => {
    
    myForm.append("user_id", userId);
    myForm.append("picture", blob)

    console.log(myForm)

    try {
        const record = await pb.collection('galerie').create(myForm);
        console.log(record)
        navigate('/handle', {state: {id: record.id}});
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (pb.authStore.model) {
      setUserId(pb.authStore.model.id)
    } else {
      setUserId("hy7rh6svnvaspyb")
    }
    console.log(userId)
  }, [image])

  return (
    <div className="video-final">
      {image === null ?
        (
				<div className="video">
					<div className="videoFeed">
						<VideoFeed id="videoFeed"/>
					</div>
					<button onClick={screenshot} className="button">Take Screenshot</button>
				</div>
        )
        :
        (
          <div>
            <img src={image} alt="Screenshot" id="screenshot"></img>
            <div>
					      <button className="button" onClick={() => setImage(null)}>Retake</button>
					      <button className="button" onClick={proceed}>Continue</button>
				      </div>
          </div>
        )}
    </div>
  );
}
