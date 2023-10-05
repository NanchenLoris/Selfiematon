import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import { Link, useNavigate } from "react-router-dom";


export default function Gallery() {

    const pb = new PocketBase('http://127.0.0.1:8090');
    pb.autoCancellation(false)

    const navigate = useNavigate();
    
    const [records, setRecords] = useState()
    const [userId, setUserId] = useState();
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Fonction pour récuperer l'id de l'utilisateur
     */
    const getId = () => {
        if (pb.authStore.model != undefined) {
            setUserId(pb.authStore.model.id)
        } else {
            setUserId("hy7rh6svnvaspyb")
        }
    }

    /**
     * fonction asynchrone pour recuperer les images liées à l'utilisateur
     */
    const getInfos = async() => {
        
        try{
            const records = await pb.collection('galerie').getList(1, 50, {
                filter: `user_id = "${userId}"`,
            });
            setRecords(records.items)
            setIsLoading(false);
        } catch(e) {
            console.log(e)
        }
    }

    /**
     * Fonction pour rediriger vers la gestion de l'image cliqué
     * @param {id de l'image à envoyer pour la gestion de l'image} imgId 
     */
    const handleImgClick = (imgId) => {
        navigate("/handle", {state: {id: imgId}})
    }

    useEffect(() => {
        getId()
        if (userId != null) {
            getInfos()
        } else {
            getId()
        }
        console.log(userId)
    }, [userId])

    if (isLoading) {
        return(
            <div>Fetching datas... Please wait</div>
        )
    }

    return(
        <div className="gallery">
            <div className="buttons">
                <Link to="/account" className="button">← Back</Link>
                <Link to="/" className="button">Home</Link>
            </div>
            <div className="gallery-images">
                { records.map((record, index) =>
                    <button onClick={(e) => handleImgClick(record.id)} key={index}>
                        <img src={`http://127.0.0.1:8090/api/files/galerie/${record.id}/${record.picture}`} className="img-gallery" alt="image"></img>
                    </button>
                )}
            </div>
            <a href="" className="button">Back to top ↑</a>
        </div>
    )
}