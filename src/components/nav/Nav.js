import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import QRCode from 'qrcode'
import './nav.css'

const Nav = ({ playing, setPlaying, to }) => {
  const [musicIcon, setMusicIcon] = useState('')
  const [qrCode, setQrCode] = useState('')

  

  useEffect(() => {
    if (playing) {
      setMusicIcon("bi bi-stop-circle")
    } else {
      setMusicIcon("bi bi-play-circle")
    }
  }, [playing])

  useEffect(() => {
    QRCode.toDataURL(to, function (err, url) {
      setQrCode(url)
    })
  },[qrCode])

  const generateQr = () => {


    Swal.fire({
      imageUrl: qrCode,
      imageHeight: 300,
      imageWidth: 300,
      title: `
      <div style="line-height: 20px">
        <p>Kepada Yth.</p>
        <p>${to}</p>
      </div>
      `,
      text: 'Silahkan tunjukkan QR Code ini kepada penerima tamu undangan di lokasi acara. Scan QR Code digunakan untuk mencatat kehadiran dan menukarkan souvenir.'
    })
  }


  return (
    <nav>
      <a href='#'><i className="bi bi-house-door"></i></a>
      <a href='#couple'><i className="bi bi-person-heart"></i></a>
      <a href='#date' ><i className="bi bi-calendar-check"></i></a>
      <a href='#gift'><i className="bi bi-gift"></i></a>
      <a href='#contact'><i className="bi bi-chat-right-text"></i></a>
      <div className="music-qr">
        <a onClick={() => setPlaying(!playing)}><i className={musicIcon}></i></a>
        <a onClick={() => generateQr()}><i className="bi bi-qr-code"></i></a>
      </div>
    </nav>
  )
}

export default Nav