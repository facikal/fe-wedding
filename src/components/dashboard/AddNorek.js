import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const AddNorek = () => {
  const [bank, setBank] = useState('');
  const [name, setName] = useState('');
  const [number,setNumber] = useState('')
  const [visible, setVisible] = useState('')
  const navigate = useNavigate()

  const [norek, setNorek] = useState([])

  useEffect(() => {
    getNorek()
  }, [])

  const getNorek = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/norek`)

    setNorek(response.data)
  };

  const createNorek = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bank", bank);
    formData.append("name", name);
    formData.append("number", number);

    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/norek`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getNorek()
      setBank('')
      setName('')
      setNumber('')
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }

  }

  const deleteNorek = async (norekId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/norek/${norekId}`)
      getNorek()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (norek.length === 2) {
      setVisible("none")
    } else {
      setVisible("block")

    }
  }, [norek])

  return (
    <div className='add-couple-info'>
      <p>{visible == "block" ? "Set Nomor Rekening" : "Nomor Rekening Sudah Diisi, Silahkan Edit Atau Delete"}</p>
      <form onSubmit={createNorek} style={{ display: visible }}>
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
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Bank</td>
            <td>Name</td>
            <td>Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {norek.map((norek, i) => (
            <tr key={norek.uuid}>
              <td>{i + 1}</td>
              <td>{norek.bank}</td>
              <td>{norek.name}</td>
              <td>{norek.number}</td>
              <td>
                <button className='btn-edit'><Link to={`editnorek/${norek.uuid}`}>Edit</Link></button>
                <button className='btn-edit' onClick={() => deleteNorek(norek.uuid)}>Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddNorek