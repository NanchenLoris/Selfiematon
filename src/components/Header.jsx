import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';
import logo from '../assets/selfiematon.png'
import "../App.css";

export default function Header() {

    const pb = new PocketBase('http://127.0.0.1:8090');
    const user = pb.authStore.model;
    const navigate = useNavigate()
    
    /**
     * fonction pour deconnecter l'utilisateur authentifié.
     */
    const logout = () => {
        pb.authStore.clear();
        window.location.replace("/");
    }

    const back = () => {
        if (window.location.href != "http://localhost:5173/") {
            navigate(-1)
        }
    }

    return(
        <div className="Header">
            <div className="header-start">
                <img src={logo} alt="logo" id="logo-head"/>
            </div>
            <div className="header-center"></div>
            <div className="header-end">
                <button className="button-header" onClick={back}>Back</button>
                <button className="button-header" onClick={() => navigate("/")}>Home</button>
                <button className="button-header" onClick={() => navigate("/gallery")}>Gallery</button>
                {!user
                ? <><button className="button-header" id="btn-login" onClick={() => navigate("/login")}>Login</button>
                    <button className="button-header" id="btn-register" onClick={() => navigate("/register")}>Register</button></>
                : <><button className="button-header" id="btn-logout" onClick={logout}>Logout</button>
                    <button className="button-header" id="btn-account" onClick={() => navigate("account")}>Account</button></>
                }
            </div>
        </div>
    )
}