import Pocketbase from "pocketbase";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Account() {

    const pb = new Pocketbase('http://127.0.0.1:8090');
    const user = pb.authStore.model;

    const [inputUsername, setInputUsername] = useState(user.username);
    const [errorMsg, setErrorMsg] = useState("");


    /**
     * fonction pour changer la valeur du pseudo
     * @param {input qui envoie la requete} e 
     */
    const usernameHandleChange = (e) => {
        setInputUsername(e.target.value);
    }


    /**
     * fonction asynchrone pour changer le pseudo dans la base de données
     */
    const handleClickUpdate = async() => {
        const data = {
            username : inputUsername,
        };
        try {
            const record = await pb.collection('users').update(user.id, data);
            window.location.reload(false);
        }
        catch(error) {
            console.log(error);
            setErrorMsg("Couldn't update user infos");
        }
    }

    /**
     * fonction asynchrone pour supprimer le compte de la base de données
     */
    const handleClickDelete = async() => {
        if (confirm("Are you sure you want to delete this account ?") == true) {
            console.log("k deleted");
            await pb.collection('users').delete(user.id);
            window.location.replace("/");
        }
    }


    return(
        <div className="account">
            <h3>Welcome back {user.username}</h3>
            <h4>Your current email: {user.email}</h4>
            <label>Username:</label>
            <input type="text" onChange={usernameHandleChange} placeholder={user.username}></input>
            <div style={{color: "red"}}>{errorMsg}</div>
            <div className="buttons-acc">
                <Link to="/" className="button">← Back</Link>
                <button className="button" onClick={handleClickDelete} style={{color: "red"}}>Delete Account</button>
                <button className="button" onClick={handleClickUpdate}>Update infos</button>
                <Link className="button" to="/gallery">View gallery</Link>
            </div>            
        </div>
    )
}