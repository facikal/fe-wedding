import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './gallery.css'

const Gallery = () => {
  const [infos, setInfos] = useState([])
  const [images, setImages] = useState([])
  const [urlVid, setUrlVid] = useState("")


  useEffect(() => {
    getInfos()
    getImage()
  }, [])

  useEffect(() => {
    for (const info of infos) {
      setUrlVid(`https://www.youtube.com/embed/${info.video}`)
    }
  },[infos])

  const getInfos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setInfos(response.data)
  };

  const getImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=gallery`)

    setImages(response.data.title)
  };

  return (
    <div className="container">
      <div className="gallery-container">
        <h2>Gallery</h2>
        <div className="gallery-box">
          {images.map(img => (
            <img data-aos="zoom-in" data-aos-anchor-placement="center-bottom" data-aos-duration="1600" key={img.id} src={img.url} />
          ))}
        </div>
        <iframe width="100%" height="380px" src={urlVid} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default Gallery