import React, { useState, useEffect } from 'react'
import './akadnikah.css'
import axios from 'axios'
const { dayIdString, monthIdString } = require('../utilities/FormatDateId')


const AkadNikah = ({ flower }) => {

  const [akadInfo, setAkadInfo] = useState([])
  const [images,setImages] = useState([])
  const [akadImg, setAkadImg] = useState("")

  useEffect(() => {
    getInfo()
    getImage()
  }, [])

  useEffect(() => {
    for (const img of images) {
      setAkadImg(img.url)
    }
  }, [images])
  
  const getInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setAkadInfo(response.data)
  };
  

  const getImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=akad`)

    setImages(response.data.title)
  };

  const handleAkadDate = (akad) => {

    const attendDate = new Date(akad.dateAkad)


    const day = attendDate.getDay()
    const date = attendDate.getDate()
    const month = attendDate.getMonth()
    const year = attendDate.getFullYear()

    const dayId = dayIdString(day)
    const monthId = monthIdString(month)

    return (
      <p key={akad.id}>{dayId}, {date} {monthId} {year}</p>
    )
  }

  const handleAkadTime = (akad) => {
    const attendDate = new Date(akad.dateAkad)

    const hour = String(attendDate.getHours()).padStart(2, "0")
    const minute = String(attendDate.getMinutes()).padStart(2, "0")

    return (<p key={akad.id}>Pukul {hour}:{minute}</p>)
  }

  const handleLocAkad = (akad) => {
    return (<p key={akad.id}>{akad.locAkad}</p>)
  }

  const handleAddressAkad = (akad) => {
    return (<p key={akad.id}>{akad.addressAkad}</p>)
  }


  return (
    <div className="resepsi-container" id="date">
      <div className="resepsi-box" data-aos="fade-up"
        data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
        <div className="border-img">
          <div className="akad-image">
            <img src={akadImg} />
          </div>
        </div>
        <h2>Akad Nikah</h2>
        <div className="eventDate">
          {akadInfo.map(handleAkadDate)}
        </div>
        <div className="eventDate">
          {akadInfo.map(handleAkadTime)}
        </div>
        <div className="location location-akad">
          {akadInfo.map(handleLocAkad)}
          {akadInfo.map(handleAddressAkad)}
        </div>
        <img src={flower} className="flower-reverse" />
      </div>
    </div>
  )
}

export default AkadNikah