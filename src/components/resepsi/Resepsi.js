import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './resepsi.css';
const { dayIdString, monthIdString } = require('../utilities/FormatDateId')


const Resepsi = ({ flower }) => {
  const [resepsiInfo, setResepsiInfo] = useState([])
  const [images, setImages] = useState([])
  const [resepsiImg, setResepsiImg] = useState("")

  useEffect(() => {
    getInfo()
    getImage()
  }, [])

  useEffect(() => {
    for (const img of images) {
      setResepsiImg(img.url)
    }
  }, [images])

  const getInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setResepsiInfo(response.data)
  };

  const getImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=resepsi`)

    setImages(response.data.title)
  };

  const handleResepsiDate = (resepsi) => {

    const attendDate = new Date(resepsi.dateResepsi)


    const day = attendDate.getDay()
    const date = attendDate.getDate()
    const month = attendDate.getMonth()
    const year = attendDate.getFullYear()

    const dayId = dayIdString(day)
    const monthId = monthIdString(month)

    return (
      <p key={resepsi.id}>{dayId}, {date} {monthId} {year}</p>
    )
  }

  const handleResepsiTime = (resepsi) => {
    const attendDate = new Date(resepsi.dateResepsi)
    
    const hour = String(attendDate.getHours()).padStart(2, "0")
    const minute = String(attendDate.getMinutes()).padStart(2, "0")

    return (<p key={resepsi.id}>Pukul {hour}:{minute}</p>)
  }

  const handleLocResepsi = (resepsi) => {
    return (<p key={resepsi.id}>{resepsi.locResepsi}</p>)
  }

  const handleAddressResepsi = (resepsi) => {
    return (<p key={resepsi.id}>{resepsi.addressResepsi}</p>)
  }
  return (
    <div className="resepsi-container" >
      <div className="resepsi-box" data-aos="fade-up"
        data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
        <div className="border-img">
          <div className="resepsi-image">
            <img src={resepsiImg} />
          </div>
        </div>
        <h2>Resepsi</h2>
        <div className="eventDate">
          {resepsiInfo.map(handleResepsiDate)}
        </div>
        <div className="eventDate eventHour">
          {resepsiInfo.map(handleResepsiTime)}
        </div>
        <div className="location location-resepsi">
          {resepsiInfo.map(handleLocResepsi)}
          {resepsiInfo.map(handleAddressResepsi)}
        </div>
        <img src={flower} className="flower-reverse" />

      </div>
    </div>
  )
}

export default Resepsi