import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditNorek = () => {
  const [bank, setBank] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const {id} = useParams()
  const navigate = useNavigate()

  const [norek, setNorek] = useState([])

  useEffect(() => {
    getNorek()
    getNorekById()
  }, [])

  const getNorek = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/norek`)

    setNorek(response.data)
  };

  const getNorekById = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/norek/${id}`)

    setBank(response.data.bank)
    setName(response.data.name)
    setNumber(response.data.number)
  };

  const updateNorek = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bank", bank);
    formData.append("name", name);
    formData.append("number", number);

    try {
      await axios.patch(`${process.env.REACT_APP_BASEURL}/norek/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getNorek()
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='add-couple-info'>
      <p>Edit Nomor Rekening</p>
      <form onSubmit={updateNorek}>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Bank" value={bank} onChange={(e) => setBank(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Atas Nama" value={name} onChange={(e) => setName(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Nomor Rekening" value={number} onChange={(e) => setNumber(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <button className="is-success" type='submit'>Kirim</button>
        </div>
      </form>
    </div>
  )
}

export default EditNorek