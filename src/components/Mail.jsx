import { useState } from "react"
import "../App.css"

export default function Mail(props) {

  const [data, setData] = useState({})
  
  const request = async() => { 
    const response = await fetch("http://127.0.0.1:8081/mail", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    if (result.msg == 'Sucessfully sent mail !') {
      alert(result.msg)
      props.showMail()
    }
  }

  const handleChange = (e) => {
    setData({"mailAdress": e.target.value, "imgName": props.imgName, "imgId": props.imgId})
  }


  return(
    <div className="Mail">
      <div className="mailer">
        <input type="test" autoComplete="off" placeholder="Enter Your Email..." id="inputMail" onChange={handleChange} />
        <img id="imgMail" src={`http://127.0.0.1:8090/api/files/galerie/${props.imgId}/${props.imgName}`} />
      </div>
      <div className="buttons">
        <button className="button" onClick={props.showMail}>Cancel</button>
        <button onClick={request} className="button">Send Mail</button>
      </div>
    </div>
  )
}