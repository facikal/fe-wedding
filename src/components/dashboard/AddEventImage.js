import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const AddEventImage = () => {
  const [title, setTitle] = useState('header');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [visible, setVisible] = useState('')
  const navigate = useNavigate()

  const [eventImage, setEventImage] = useState([])

  useEffect(() => {
    getEventImage()
  }, [])

  const getEventImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage`)

    setEventImage(response.data.result)
  };

  const createEventImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/eventimage`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }

      });
      getEventImage()
      setPreview('')
      setTitle('')
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

  const deleteEventImage = async (eventImageId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/eventimage/${eventImageId}`)
      getEventImage()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (eventImage.length === 12) {
      setVisible("none")
    } else {
      setVisible("block")

    }
  }, [eventImage])

  return (
    <div className='add-couple-info'>
      <p>{visible == "block" ? "Set Gambar Undangan" : "Gambar Udangan Sudah Diisi, Silahkan Edit Atau Delete"}</p>
      <form onSubmit={createEventImage} style={{ display: visible }}>
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
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Title</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {eventImage.map((image, i) => (
            <tr key={image.uuid}>
              <td>{i + 1}</td>
              <td>{image.title}</td>
              <td>
                <button className='btn-edit'><Link to={`editeventimage/${image.uuid}`}>Edit</Link></button>
                <button className='btn-edit' onClick={() => deleteEventImage(image.uuid)}>Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddEventImage