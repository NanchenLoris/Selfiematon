import { useEffect, useState } from "react";
import VideoFeed from "./VideoFeed";
import PocketBase from 'pocketbase';
import html2canvas from 'html2canvas';
import '../App.css'
import { useNavigate } from "react-router-dom";


/**
 * fonction composant pour afficher le flux vidéo, prendre un screenshot
 * et envoyer le screenshot à la base de données 
 */
export default function Camera() {

  const pb = new PocketBase('http://127.0.0.1:8090');
  const myForm = new FormData()

  const navigate = useNavigate();
  
  const [image, setImage] = useState(null)
  const [blob, setBlob] = useState()
  const [userId, setUserId] = useState();

  
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

    try {
        const record = await pb.collection('galerie').create(myForm);
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
  }, [image])

  return (
    <div className="Camera">
      {image === null ?
        (
				<div className="video">
					<div className="videoFeed">
						<VideoFeed id="videoFeed"/>
					</div>
					<button className="button" onClick={screenshot}>Take Photo</button>
				</div>
        )
        :
        (
          <div>
            <img src={image} alt="Screenshot" id="screenshot" ></img>
            <div className="buttons">
					      <button className="button" onClick={() => setImage(null)}>Retake</button>
					      <button className="button" onClick={proceed}>Continue</button>
				      </div>
          </div>
        )}
    </div>
  );
}
