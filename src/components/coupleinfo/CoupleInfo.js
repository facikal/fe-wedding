import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './coupleinfo.css'

const CoupleInfo = () => {
  const [femaleInfo, setFemaleInfo] = useState("")
  const [maleInfo, setMaleInfo] = useState("")

  useEffect(() => {
    getCoupleInfo()
  }, [])

  const getCoupleInfo = async () => {
    const female = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo?search_gender=female`);
    const male = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo?search_gender=male`);

    setFemaleInfo(female.data.gender)
    setMaleInfo(male.data.gender)
  }

  return (
    <div className="couple-container" id="couple">
      <div className="couple-box" data-aos="fade-up"
        data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
        <div className="border-img-couple">
          <div className="pic">
            <img src={femaleInfo.url} />
            <h2 className="women-nick">{femaleInfo.nick}</h2>
            <p>{femaleInfo.full}</p>
            <p>{femaleInfo.child}</p>
            <p>Bapak {femaleInfo.father} & Ibu {femaleInfo.mother}</p>
          </div>
          <div className="love">
            <i className="bi bi-arrow-through-heart-fill" style={{ color: "white" }}></i>
          </div>
          <div className="pic">
            <img src={maleInfo.url} />
            <h2 className="man-nick">{maleInfo.nick}</h2>
            <p>{maleInfo.full}</p>
            <p>{maleInfo.child}</p>
            <p>Bapak {maleInfo.father} & Ibu {maleInfo.mother}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoupleInfo