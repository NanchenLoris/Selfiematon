import { useState } from "react"
import "../App.css"

export default function Twitter(props) {

  const [data, setData] = useState({})
  
  const request = async() => { 
    const response = await fetch("http://127.0.0.1:8081/twitter", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    if (result.msg == "Sucessfully tweeted!") {
      alert(result.msg)
      props.showTwitter()
    }
  }

  const handleChange = (e) => {
    setData({"message": e.target.value, "imgName": props.imgName, "imgId": props.imgId})
  }


  return(
    <div className="Twitter">
      <div className="tweet">
        <input type="text" autoComplete="off" placeholder="Enter text..." id="inputTwitter" onChange={handleChange} />
        <img id="imgTwitter" src={`http://127.0.0.1:8090/api/files/galerie/${props.imgId}/${props.imgName}`} />
      </div>
      <div className="buttons">
        <button className="button" onClick={props.showTwitter}>Cancel</button>
        <button onClick={request} className="button">Tweet</button>
      </div>
    </div>
  )
}