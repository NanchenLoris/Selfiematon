import "../App.css";
import qr from "../assets/qr-twitter.svg"

export default function Footer() {

    return(
        <div className="Footer">
            <div className="footer-start">
                Copyright @ 2023 Loris Nanchen, All right reserved
            </div>
            <div className="footer-end" >
                <img src={qr} alt="qr"/>
            </div>
        </div>
    )
}
