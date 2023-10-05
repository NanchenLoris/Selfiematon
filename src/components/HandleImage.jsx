import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import html2canvas from 'html2canvas';
import insta from '../assets/instagram.svg';
import print from '../assets/printer.svg';
import trash from '../assets/trash3.svg';
import back from '../assets/arrow.svg';

export default function HandleImage() {

    const pb = new PocketBase('http://127.0.0.1:8090');
    pb.autoCancellation(false)

    const location = useLocation()
    const navigate = useNavigate();
    
    const [imgId, setImgId] = useState()
    const [imgName, setImgName] = useState()
    const [isLoading, setIsLoading] = useState(true);


    /**
     * fonction asynchrone pour recuperer l'image selon l'id recu
     */
    const getInfos = async() => {
        try{
            const records = await pb.collection('galerie').getOne(location.state.id, {
                expand: 'relField1,relField2.subRelField',
            });
            setImgId(records.id)
            setImgName(records.picture)
            setIsLoading(false);
        } catch(e) {
            console.log(e)
        }
    }

    /**
     * fonction asynchrone pour supprimer l'image de la base de données
     */
    const delImg = async() => {
        if (confirm("Are you sure you want to delete this screenshot ?") == true) {
            await pb.collection('galerie').delete(imgId);
            window.location.replace("/");
        }
    }

    useEffect(() => {
        getInfos()
    } ,[])

    if (isLoading) {
        return(
            <div>Fetching datas... Please wait</div>
        )
    }

    return(
        <div>
            <img src={`http://127.0.0.1:8090/api/files/galerie/${imgId}/${imgName}`} id='imageFilter' style={{filter: imgFilter}} alt="image"></img>
            <div className="buttons">
                <button className="button"><img src={print}></img></button>
                <button className="button"><img src={insta}></img></button>
                <button className="button" onClick={delImg}><img src={trash}></img></button>
                <button className='button' onClick={() => navigate(-1)}><img src={back}></img></button>
            </div>
        </div>
    )
}