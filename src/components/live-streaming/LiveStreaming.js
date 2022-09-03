import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './livestreaming.css'

const LiveStreaming = () => {
  const [infos, setInfos] = useState([])
  const [igurl, setIgurl] = useState("")

  useEffect(() => {
    getInfos()
  }, [])

  useEffect(() => {
    for (const info of infos) {
      setIgurl(`https://${info.instagram}`)
    }
  }, [infos])

  const getInfos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setInfos(response.data)
  };

  return (
    <div className="live">
      <div data-aos="fade-up"
        data-aos-anchor-placement="center-bottom">
        <h2>Live Streaming</h2>
        <p>Temu kami secara virtual untuk menyaksikan acara pernikahan kami yang insyaaAllah akan disiarkan langsung melalui akun instagram kami berikut ini.</p>
        <a href={igurl} target="_blank"><button className="watch-live"><i className="bi bi-instagram"></i>Live Streaming</button></a>
        <div>
          <img src="assets/img/flower.png" alt="" className="flower-reverse" />
        </div>
      </div>
    </div>
  )
}

export default LiveStreaming