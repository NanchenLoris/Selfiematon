import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef, forwardRef } from "react";
import Twitter from './Twitter';
import PocketBase from 'pocketbase';
import twitter from '../assets/twitter.svg';
import printer from '../assets/printer.svg';
import trash from '../assets/trash3.svg';
import mail from '../assets/mail.svg';
import "../App.css";
import ReactToPrint from 'react-to-print';
import Mail from './Mail';
import Alert from './Alert';

export default function HandleImage() {

    const pb = new PocketBase('http://127.0.0.1:8090');
    pb.autoCancellation(false)

    const location = useLocation()
    const navigate = useNavigate();
    let ref = useRef();
    
    const [displayTwitter, setDisplayTwitter] = useState("none")
    const [displayMail, setDisplayMail] = useState("none")
    const [displayAlert, setDisplayAlert] = useState("none")
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
        await pb.collection('galerie').delete(imgId);
        navigate(-1)
    }

    /**
     * fonction pour changer l'affichage du composant Twitter
     */
    const showTwitter = () => {
        if (displayTwitter == "none") {
            setDisplayTwitter("block")
        } else {
            setDisplayTwitter("none")
        }
    }

    /**
     * fonction pour changer l'affichage du composant Mail
     */
    const showMail = () => {
        if (displayMail == "none") {
            setDisplayMail("block")
        } else {
            setDisplayMail("none")
        }
    }

    /**
     * fonction pour changer l'affichage du composant Twitter
     */
    const showAlert = () => {
        if (displayAlert == "none") {
            setDisplayAlert("block")
        } else {
            setDisplayAlert("none")
        }
    }

    const MyPrintComponent = forwardRef((props, ref) => {
        return(
            <div ref={ref} className='print'>
                <img src={`http://127.0.0.1:8090/api/files/galerie/${imgId}/${imgName}`} id='image' alt="image"></img>
            </div>
        )
    })

    useEffect(() => {
        getInfos()
    } ,[])

    if (isLoading) {
        return(
            <div>Fetching datas... Please wait</div>
        )
    }

    return(
        <div className='HandleImage'>
            <div className='alert' style={{display: displayAlert}}>
                <Alert continue={delImg} cancel={showAlert} />
            </div>
            <div className='twitter' style={{display: displayTwitter}}>
                <Twitter imgId={imgId} imgName={imgName} showTwitter={showTwitter}/>
            </div>
            <div className='mail' style={{display: displayMail}}>
                <Mail imgId={imgId} imgName={imgName} showMail={showMail}/>
            </div>
            <img src={`http://127.0.0.1:8090/api/files/galerie/${imgId}/${imgName}`} id='image' alt="image"></img>
            <div style={{display: "none"}}>
                <MyPrintComponent ref={(el) => (ref = el)} />
            </div>
            <div className="buttons">
                <ReactToPrint
                    trigger={() => <button className="button"><img src={printer}></img></button>}
                    content={() => ref}
                />
                <button className="button" onClick={showTwitter}><img src={twitter}></img></button>
                <button className="button" onClick={showMail}><img src={mail}></img></button>
                <button className="button" onClick={() => setDisplayAlert("block")}><img src={trash}></img></button>
            </div>
        </div>
    )
}