import { useState } from "react";
import PocketBase from 'pocketbase';
import { Link } from "react-router-dom";
import "../App.css";

export default function Login() {

    const pb = new PocketBase('http://127.0.0.1:8090');

    const [inputPassword, setInputPassword] = useState();
    const [inputUsername, setInputUsername] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    /**
     * fonction asynchrone pour authentifier l'utilisateur
     */
    const handleClick = async() => {
        let password = inputPassword;
        let username = inputUsername;

        try {
            const record = await pb.collection('users').authWithPassword(username, password);
            window.location.replace("/");
        }
        catch(error) {
            console.log(error);
            setErrorMsg("Log in Failed");
        }
    }

    /**
     * fonction pour changer la valeur du pseudo
     * @param {input qui envoie la requete} e 
     */
    const usernameHandleChange = (e) => {
        setInputUsername(e.target.value);
    }

    /**
     * fonction pour changer la valeur du pseudo
     * @param {input qui envoie la requete} e 
     */
    const passwordHandleChange = (e) => {
        setInputPassword(e.target.value);
    }

    return(
        <div className="login">
            <label>Username:</label>
            <input type="text" onChange={usernameHandleChange} placeholder="enter your username..."></input>
            <label>Password:</label>
            <input type="password" onChange={passwordHandleChange} placeholder="enter your password..."></input>
            <div style={{color: "red"}}>{errorMsg}</div>
            <Link id="btn-register" to="../register">No account yet ?</Link>
            <div className="buttons">
                <button to="/" className="button">← Back</button>
                <button className="button" onClick={handleClick}>Confirm</button>
            </div>
        </div>
    )
}