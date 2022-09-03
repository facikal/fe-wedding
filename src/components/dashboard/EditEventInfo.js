import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditEventInfo = () => {
  const [dateAkad, setDateAkad] = useState('header');
  const [locAkad, setLocAkad] = useState('');
  const [addressAkad, setAddressAkad] = useState('');
  const [dateResepsi, setDateResepsi] = useState('')
  const [locResepsi, setLocResepsi] = useState('');
  const [addressResepsi, setAddressResepsi] = useState('');
  const [textFirstMeet, setTextFirstMeet] = useState('');
  const [textJadian, setTextJadian] = useState('');
  const [textLamaran, setTextLamaran] = useState('');
  const [video, setVideo] = useState('');
  const [addressGift, setAddressGift] = useState('');
  const [recieverGift, setRecieverGift] = useState('');
  const [instagram, setInstagram] = useState('');

  const {id} = useParams()
  const navigate = useNavigate()

  const [eventInfo, setEventInfo] = useState([])

  useEffect(() => {
    getEventInfo()
    getEventInfoById()
  }, [])

  const getEventInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setEventInfo(response.data)
  };

  const getEventInfoById = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo/${id}`)

    
    setLocAkad(response.data.locAkad)
    setAddressAkad(response.data.addressAkad)
    setLocResepsi(response.data.locResepsi)
    setAddressResepsi(response.data.addressResepsi)
    setTextFirstMeet(response.data.textFirstMeet)
    setTextJadian(response.data.textJadian)
    setTextLamaran(response.data.textLamaran)
    setVideo(response.data.video)
    setAddressGift(response.data.addressGift)
    setRecieverGift(response.data.recieverGift)
    setInstagram(response.data.instagram)
  }
  const updateEventInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dateAkad", dateAkad)
    formData.append("locAkad", locAkad)
    formData.append("addressAkad", addressAkad)
    formData.append("dateResepsi", dateResepsi)
    formData.append("locResepsi", locResepsi)
    formData.append("addressResepsi", addressResepsi)
    formData.append("textFirstMeet", textFirstMeet)
    formData.append("textJadian", textJadian)
    formData.append("textLamaran", textLamaran)
    formData.append("video", video)
    formData.append("addressGift", addressGift)
    formData.append("recieverGift", recieverGift)
    formData.append("instagram", instagram)

    try {
      await axios.patch(`${process.env.REACT_APP_BASEURL}/eventinfo/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getEventInfo()
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className='add-couple-info'>
      <p>Edit Info Undangan</p>
      <form onSubmit={updateEventInfo}>
        <div className="filed">
          <div className="control">
            <i>Tanggal Akad</i>
            <input required className="input" type="datetime-local" value={dateAkad} onChange={(e) => setDateAkad(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Lokasi Akad" value={locAkad} onChange={(e) => setLocAkad(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <textarea required className="input" type="text" placeholder="Alamat Lengkap Akad" value={addressAkad} onChange={(e) => setAddressAkad(e.target.value)}></textarea>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <i>Tanggal Resepsi</i>
            <input required className="input" type="datetime-local" value={dateResepsi} onChange={(e) => setDateResepsi(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Lokasi Resepsi" value={locResepsi} onChange={(e) => setLocResepsi(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <textarea required className="input" type="text" placeholder="Alamat Lengkap Resepsi" value={addressResepsi} onChange={(e) => setAddressResepsi(e.target.value)}></textarea>
          </div>
        </div>
        <hr />
        <p>Komponen Undangan</p>
        <div className="filed">
          <div className="control">
            <textarea required className="input" type="text" placeholder="Kata-kata Cerita First Meet" value={textFirstMeet} onChange={(e) => setTextFirstMeet(e.target.value)}></textarea>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <textarea required className="input" type="text" placeholder="Kata-kata Cerita Jadian" value={textJadian} onChange={(e) => setTextJadian(e.target.value)}></textarea>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <textarea required className="input" type="text" placeholder="Kata-kata Cerita Lamaran" value={textLamaran} onChange={(e) => setTextLamaran(e.target.value)}></textarea>
          </div>
        </div>
        <i>Masukan Link Youtube Seperti Contoh Yang Dimerahi Dibawah ini : <br />https://www.youtube.com/watch?v=<strong style={{ color: "red" }}>ZDa4lk1DlI0</strong>&list=WL&index=70</i>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Link Video Youtube, Contoh : ZDa4lk1DlI0" value={video} onChange={(e) => setVideo(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Nama Penerima Hadiah" value={recieverGift} onChange={(e) => setRecieverGift(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <textarea required className="input" type="text" placeholder="Alamat Pengiriman Hadiah" value={addressGift} onChange={(e) => setAddressGift(e.target.value)}></textarea>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Link Instagram Untuk Live Streaming" value={instagram} onChange={(e) => setInstagram(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <button className="is-success" type='submit'>Kirim</button>
        </div>
      </form>
    </div>
  )
}

export default EditEventInfo