import { Link } from "react-router-dom";
import PocketBase from 'pocketbase';
import "../App.css";

export default function Header() {

    const pb = new PocketBase('http://127.0.0.1:8090');
    const user = pb.authStore.model;
    
    /**
     * fonction pour deconnecter l'utilisateur authetifié.
     * s'affiche si l'utilisateur est authentifié
     */
    function logout() {
        pb.authStore.clear();
        window.location.reload(false);
        window.location.replace("/");
    }

    return(
        <div className="header">
            {/* <div className="header-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
                Selfiematon
            </div> */}
            <div className="header-end">
                {!user
                ? <><Link className="button" id="btn-register" to="register">Register</Link><Link className="button" id="btn-login" to="login">Login</Link></>
                : <><Link className="button" id="btn-logout" onClick={logout}>Logout</Link><Link className="button" id="btn-account" to="account">My Account</Link></>
                }
            </div>
        </div>
    )
}