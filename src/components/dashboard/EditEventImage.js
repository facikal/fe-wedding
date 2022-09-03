import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditEventImage = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const { id } = useParams();
  const navigate = useNavigate()

  const [eventImage, setEventImage] = useState([])

  useEffect(() => {
    getEventImage()
    getEventImageById()
  }, [])

  const getEventImageById = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage/${id}`)

    setPreview(response.data.url)
    setTitle(response.data.title)
  }

  const getEventImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage`)

    setEventImage(response.data.result)
  };



  const updateEventImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);


    try {
      await axios.patch(`${process.env.REACT_APP_BASEURL}/eventimage/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getEventImage()
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
      <p>Edit Gambar Undangan</p>
      <form onSubmit={updateEventImage}>
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
              <select required value={title} onChange={(e) => setTitle(e.target.value)}>
                <option value="header">Gambar Header</option>
                <option value="akad">Gambar Akad</option>
                <option value="resepsi">Gambar Resepsi</option>
                <option value="firstmeet">Gambar First Meet</option>
                <option value="jadian">Gambar Jadian</option>
                <option value="lamaran">Gambar Lamaran</option>
                <option value="gallery">Gambar Gallery</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filed">
          <button className="is-success" type='submit'>Kirim</button>
        </div>
      </form>
    </div>
  )
}

export default EditEventImage