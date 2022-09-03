import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./header.css";
const { dayIdString, monthIdString } = require('../utilities/FormatDateId')


const Header = ({ flower, to }) => {

  // date resepsi
  const [saveDate, setSaveDate] = useState('')
  const [resepsiDate, setResepsiDate] = useState([])
  const [onCountdown, setOnCountDown] = useState('')
  const [images, setImages] = useState([])
  const [headerImg, setHeaderImg] = useState("")

  useEffect(() => {
    getInfo()
    getImage()
  }, [])

  useEffect(() => {
    for (const img of images) {
      setHeaderImg(img.url)
    }
  }, [images])
  
  useEffect(() => {
    for (const resepsi of resepsiDate) {
      const text = resepsi.dateResepsi
      const newText = text.replace(/[-:]/g, '')
      const newText1 = newText.replace(/.000Z/, 'Z')
      setSaveDate(`https://www.google.com/calendar/render?action=TEMPLATE&text=test&details=test&location=test&dates=${newText1}%2F${newText1}`)

    }
  }, [resepsiDate])

  
  const getInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)
    
    setResepsiDate(response.data)
  };
  

  const getImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=header`)

    setImages(response.data.title)
  };

  const handleResepsiDate = (resepsi, i) => {

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

  // end of date resepsi

  // countdown

  const handleCountDown = (resepsi) => {

    const x = setInterval(() => {
      const now = new Date().getTime()
      const countDownDate = new Date(resepsi.dateResepsi).getTime()

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setOnCountDown(
        <ul className="countdown-box" key={resepsi.id}>
          <li className="li-item">
            <div className="countdown-item">
              <span>{days}</span>
              <span>Hari</span>
            </div>
          </li>
          <li className="li-item">
            <div className="countdown-item">
              <span>{hours}</span>
              <span>Jam</span>
            </div>
          </li>
          <li className="li-item">
            <div className="countdown-item">
              <span>{minutes}</span>
              <span>Menit</span>
            </div>
          </li>
          <li className="li-item">
            <div className="countdown-item">
              <span>{seconds}</span>
              <span>Detik</span>
            </div>
          </li>
        </ul>
      )
    }, 1000)

    return onCountdown
  }
  // end of countdown
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
    <header>
      <div className="container">
        <div className="header-container">
          <div className="header-img">
            <img src={flower} alt="" />
          </div>
          <h3>THE WEDDING OF</h3>
          <div className="header-text">
            <h2 className="couple">{femaleInfo.nick} & {maleInfo.nick}</h2>
          </div>
          <div className="image-box">
            <div className="image-box-border">
              <img src={headerImg} />
            </div>
            <div id="countdown">
              {resepsiDate.map(handleCountDown)}
            </div>
            <div className="eventDate">
              {resepsiDate.map(handleResepsiDate)}
            </div>
            <a href={saveDate} target="_blank"><button className="btn-save"><i className="bi bi-calendar-check"></i>Simpan Tanggal</button></a>
            <div>
              <h2>Kepada Yth.</h2>
              <h2>Bapak/Ibu/Saudara/i</h2>
              <h2 className="to">{to}</h2>
              <h2>Kami Mengundang Anda<br />Untuk Menghadiri Acara Resepsi Pernikahan Kami</h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header