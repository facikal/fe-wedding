import React, { useState } from 'react'
import axios from 'axios';

const AddComment = ({ rows, totalHadir, totalTidakHadir, totalMasihRagu, getComment, setPage }) => {
  const [nama, setNama] = useState('');
  const [ucapan, setUcapan] = useState('');
  const [kehadiran, setKehadiran] = useState('Hadir');


  const saveComment = async (e) => {
    e.preventDefault();
    
    getComment()
    const x = setTimeout(() => {
      setPage(0)
      clearTimeout(x)
    },100)

    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/comment`, {
        nama,
        ucapan,
        kehadiran
      });
    } catch (error) {
      console.log(error)
    }


    setNama('')
    setUcapan('')
  }

  return (
    <div>
      <p style={{ fontSize: "20px" }}>{rows} Komentar</p>
      <div className='kehadiran'>
        <div className='kehadiran-box'>
          {totalHadir}
          <p>Hadir</p>
        </div>
        <div className='kehadiran-box'>
          {totalTidakHadir}
          <p>Tidak Hadir</p>
        </div>
        <div className='kehadiran-box'>
          {totalMasihRagu}
          <p>Masih Ragu</p>
        </div>
      </div>
      <div className='add-box'>
        <form onSubmit={saveComment}>
          <div className="filed">
            <div className="control">
              <input required className="input" type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}></input>
            </div>
          </div>
          <div className="filed">
            <div className="control">
              <textarea required className="input" type="text" placeholder="Ucapan" value={ucapan} onChange={(e) => setUcapan(e.target.value)}></textarea>
            </div>
          </div>
          <div className="filed">
            <div className="control">
              <div>
                <p>Konfirmasi Kehadiran</p>
                <select required defaultValue={kehadiran} onChange={(e) => setKehadiran(e.target.value)}>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Masih Ragu">Masih Ragu</option>
                </select>
              </div>
            </div>
          </div>
          <div className="filed">
            <button className="is-success" type='submit'>Kirim</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddComment