import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import { useNavigate } from "react-router-dom";


export default function Gallery() {

    const pb = new PocketBase('http://127.0.0.1:8090');
    pb.autoCancellation(false)

    const navigate = useNavigate();
    
    const [records, setRecords] = useState([])
    const [userId, setUserId] = useState();
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Fonction pour récuperer l'id de l'utilisateur
     */
    const getId = () => {
        if (pb.authStore.model != undefined) {
            setUserId(pb.authStore.model.id)
        } else {
            setUserId("vaq9dslk5ds1eqi")
        }
    }

    /**
     * fonction asynchrone pour recuperer les images liées à l'utilisateur
     */
    const getImages = async() => {
        
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

    useEffect(() => {
        getId()
        if (userId != null) {
            getImages()
        } else {
            getId()
        }
    }, [userId])

    if (isLoading) {
        return(
            <div>Fetching datas... Please wait</div>
        )
    }

    return(
        <div className="Gallery">
            {records?.length === 0 ?
                (<div>
                    <p>Take pictures to see them appear here</p>
                    <button className="button" onClick={() => navigate("/")}>Take Picture</button>
                </div>) : (
                <div className="gallery-images">
                    { records.map((record, index) =>
                        <button onClick={(e) => navigate("/handle", {state: {id: record.id}})} className="button-gallery" key={index}>
                            <img src={`http://127.0.0.1:8090/api/files/galerie/${record.id}/${record.picture}`} className="img-gallery" alt="image"></img>
                        </button>
                    )}
                </div>)}
        </div>
    )
}