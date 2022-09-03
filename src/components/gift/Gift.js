import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import './gift.css'

const Gift = () => {
  const alamat = useRef()
  const [norek, setNorek] = useState([])

  const copyAlamat = () => {
    alamat.current.select()
    document.execCommand('copy')
  }

  const [infos, setInfos] = useState([])

  useEffect(() => {
    getInfos()
    getNorek()
  }, [])

  const getNorek = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/norek`)

    setNorek(response.data)
  }

  const getInfos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setInfos(response.data)
  };

  const handleAddress = (info) => {
    return info.addressGift
  }

  const handleReciever = (info) => {
    return info.recieverGift
  }

  return (
    <div className="gift-container" id="gift">
      <div className="gift-box">
        <h2>Wedding Gift</h2>
        <p>Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.</p>
        <div className="gift-content">
          <h1><i className="bi bi-gift-fill"></i></h1>
          {norek.map(norek => (
            <div key={norek.id}>
              <hr />
              <p>{norek.bank} - {norek.name}</p>
              <input readOnly type="text" className="copyText" defaultValue={norek.number} /><br />
            </div>

          ))}
        
        </div>
        <div className="gift-content">
          <h1><i className="bi bi-house-fill"></i></h1>
          <p>Alamat Pengiriman<br />Hadiah Fisik</p>
          <input ref={alamat} readOnly type="text" className="copyText" defaultValue={infos.map(handleAddress)} /><br />
          <p style={{marginTop:"0"}}>{infos.map(handleReciever)}</p>
          <button onClick={copyAlamat} className="alamat"><i className="bi bi-clipboard"></i>Salin Alamat</button>
        </div>
      </div>
    </div>
  )
}

export default Gift