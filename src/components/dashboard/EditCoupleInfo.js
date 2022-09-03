import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditCoupleInfo = () => {
  const [gender, setGender] = useState('male');
  const [full, setFull] = useState('');
  const [nick, setNick] = useState('');
  const [file, setFile] = useState('');
  const [child, setChild] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [preview, setPreview] = useState('');
  const {id} = useParams();
  const navigate = useNavigate()

  const [coupleInfo, setCoupleInfo] = useState([])

  useEffect(() => {
    getCoupleInfo()
    getCoupleInfoById()
  }, [])

  const getCoupleInfoById = async() => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo/${id}`)
    
    setPreview(response.data.url)
    setFull(response.data.full)
    setNick(response.data.nick)
    setFile(response.data.image)
    setGender(response.data.gender)
    setChild(response.data.child)
    setFather(response.data.father)
    setMother(response.data.mother)
  }


  const getCoupleInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/coupleinfo`);

    setCoupleInfo(response.data.result)
  }


  const updateCoupleInfo = async (e) => {
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
      await axios.patch(`${process.env.REACT_APP_BASEURL}/coupleinfo/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getCoupleInfo()
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

  return (
    <div className='add-couple-info'>
      <form onSubmit={updateCoupleInfo}>
            <div className="control">
              <p>Edit Mempelai</p>
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
    </div>
  )
}

export default EditCoupleInfo