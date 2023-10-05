import { useState, useEffect } from "react";
import Pocketbase from "pocketbase";
import { Link } from "react-router-dom";
import "../App.css";

export default function Register() {

    const pb = new Pocketbase('http://127.0.0.1:8090');

    const [inputUsername, setInputUsername] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");


    /**
     * fonction asynchrone pour enregister et authentifier l'utilisateur
     */
    const handleClick = async() => {
        const data = {
            username : inputUsername,
            password : inputPassword,
            passwordConfirm : inputPassword,
            email : inputEmail,
        };
        try {
            const record = await pb.collection('users').create(data);
            const recordLogin = await pb.collection('users').authWithPassword(inputEmail, inputPassword);
            window.location.replace("/");
        }
        catch(error) {
            console.log(error);
            setErrorMsg("Register Failed");
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
     * fonction pour changer la valeur du mail
     * @param {input qui envoie la requete} e 
     */
    const emailHandleChange = (e) => {
        setInputEmail(e.target.value);
    }

    /**
     * fonction pour changer la valeur du mot de passe
     * @param {input qui envoie la requete} e 
     */
    const passwordHandleChange = (e) => {
        setInputPassword(e.target.value);
    }

    return(
        <div className="register">
            <label>Username:</label>
            <input type="text" onChange={usernameHandleChange} placeholder="ex. John Doe"></input>
            <label>Email:</label>
            <input type="email" onChange={emailHandleChange} placeholder="ex. john.doe@gmail.com"></input>
            <label>Password:</label>
            <input type="password" onChange={passwordHandleChange} placeholder="choose a password..."></input>
            <label>Your Country:</label>
            <div style={{color: "red"}}>{errorMsg}</div>
            <Link id="btn-register" to="../login">Already have an account ?</Link>
            <div className="buttons">
                <Link to="/" className="button">← Back</Link>
                <Link className="button" onClick={handleClick}>Confirm</Link>
            </div>
        </div>
    )
}