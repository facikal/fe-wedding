import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const AddCoupleInfo = () => {
  const [gender, setGender] = useState('male');
  const [full, setFull] = useState('');
  const [nick, setNick] = useState('');
  const [file, setFile] = useState('');
  const [child, setChild] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [preview, setPreview] = useState('');
  const [visible, setVisible] = useState('')
  const navigate = useNavigate()

  const [coupleInfo, setCoupleInfo] = useState([])

  useEffect(() => {
    getCoupleInfo()
  }, [])

  const getCoupleInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo`);

    setCoupleInfo(response.data.result)
  }

  const createCoupleInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("full", full);
    formData.append("nick", nick);
    formData.append("child", child);
    formData.append("father", father);
    formData.append("mother", mother);
    formData.append("file", file);


    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/coupleinfo`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getCoupleInfo()
      setPreview('')
      setFull('')
      setNick('')
      setChild('')
      setFather('')
      setMother('')
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }

  }

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const deleteCoupleInfo = async (coupleInfoId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/coupleinfo/${coupleInfoId}`)
      getCoupleInfo()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (coupleInfo.length == 2) {
      setVisible("none")
    } else {
      setVisible("block")

    }
  }, [coupleInfo])

  return (
    <div className='add-couple-info'>
      <p>{visible == "block" ? "Set Mempelai" : "Mempelai Sudah Diisi, Silahkan Edit Atau Delete"}</p>
      <form onSubmit={createCoupleInfo} style={{ display: visible }}>
        <div className="control">
          <input required className="input" type="file" onChange={loadImage}></input>
          {preview ? (
            <figure className='figure'>
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : ("")}
        </div>
        <div className="filed">
          <div className="control">
            <div>
              <select required value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Fullname" value={full} onChange={(e) => setFull(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Nickname" value={nick} onChange={(e) => setNick(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Putra/Putri ke" value={child} onChange={(e) => setChild(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Nama Ayah" value={father} onChange={(e) => setFather(e.target.value)}></input>
          </div>
        </div>
        <div className="filed">
          <div className="control">
            <input required className="input" type="text" placeholder="Nama Ibu" value={mother} onChange={(e) => setMother(e.target.value)}></input>
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
            <td>Gender</td>
            <td>Full Name</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {coupleInfo.map((couple, i) => (
            <tr key={couple.uuid}>
              <td>{i + 1}</td>
              <td>{couple.gender}</td>
              <td>{couple.full}</td>
              <td>
                <button className='btn-edit'><Link to={`editcoupleinfo/${couple.uuid}`}>Edit</Link></button>
                <button className='btn-edit' onClick={() => deleteCoupleInfo(couple.uuid)}>Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddCoupleInfo