import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./opening.css";


const Opening = ({ flower, playing, setPlaying, to }) => {
  const [femaleInfo, setFemaleInfo] = useState("")
  const [maleInfo, setMaleInfo] = useState("")
  const [visible, setVisible] = useState(true)
  const [window, setWindow] = useState("")
  const [display, setDisplay] = useState("")

  useEffect(() => {

    if (visible == false) {
      setPlaying(!playing)
      setWindow("opening fade")
      setTimeout(() => {
        setDisplay("none")
      }, 1000)
    } else {
      setWindow("opening")
    }

  }, [visible])

  const closeWindow = () => {
    setVisible(false)
  }

  useEffect(() => {
    getCoupleInfo()
  },[])

  const getCoupleInfo = async () => {
    const female = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo?search_gender=female`);
    const male = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo?search_gender=male`);

    setFemaleInfo(female.data.gender)
    setMaleInfo(male.data.gender)
  }
  console.log(femaleInfo.nick);
  return (
    <React.Fragment>
      <audio src="assets/audio/song.mp3" type="audio/mp3" autoPlay loop />
      <div className={window} style={{ display }} >
        <div className="opening-content">
          <div className="opening-img">
            <img src={flower} />
            <h2 className="couple">{femaleInfo.nick} & {maleInfo.nick}</h2>
          </div>
          <div className="open">
            <h2>Kepada Yth.</h2>
            <h2 className="to">{to}</h2>
          </div>
          <div className="btn-masuk">
            <button onClick={closeWindow}>Buka Undangan</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Opening