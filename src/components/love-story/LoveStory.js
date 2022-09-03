import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './lovestory.css'

const LoveStory = ({ flower }) => {
  const [infos, setInfos] = useState([])
  const [imagesFirstMeet, setImagesimagesFirstMeet] = useState([])
  const [imagesJadian, setImagesimagesJadian] = useState([])
  const [imagesLamaran, setImagesimagesLamaran] = useState([])
  const [firstMeetImg, setFirstMeetImg] = useState("")
  const [jadianImg, setJadianImg] = useState("")
  const [lamaranImg, setLamaranImg] = useState("")

  useEffect(() => {
    getInfos()
    getImage()
  }, [])

  useEffect(() => {
    for (const img of imagesFirstMeet) {
      setFirstMeetImg(img.url)
    }
    for (const img of imagesJadian) {
      setJadianImg(img.url)
    }
    for (const img of imagesLamaran) {
      setLamaranImg(img.url)
    }
  }, [imagesFirstMeet])

  const getInfos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/eventinfo`)

    setInfos(response.data)
  };

  const getImage = async () => {
    const firstMeet = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=firstmeet`)
    const jadian = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=jadian`)
    const lamaran = await axios.get(`${process.env.REACT_APP_BASEURL}/eventimage?title=lamaran`)

    setImagesimagesFirstMeet(firstMeet.data.title)
    setImagesimagesJadian(jadian.data.title)
    setImagesimagesLamaran(lamaran.data.title)
  };

  const handleFirstMeet = (info) => {
    return (<p key={info.id}>{info.textFirstMeet}</p>)
  }
  const handleJadian = (info) => {
    return (<p key={info.id}>{info.textJadian}</p>)
  }
  const handleLamaran = (info) => {
    return (<p key={info.id}>{info.textLamaran}</p>)
  }

  return (
    <div className="container">
      <div className="love-container">
        <h2>Love Story</h2>
        <p>Asa dalam nama Cinta</p>
        <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1600">
          <img src={firstMeetImg} />
          <h3>First Meet</h3>
          {infos.map(handleFirstMeet)}
        </div>
        <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1600">
          <img src={jadianImg} />
          <h3>Jadian</h3>
          {infos.map(handleJadian)}
        </div>
        <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1600">
          <img src={lamaranImg} />
          <h3>Lamaran</h3>
          {infos.map(handleLamaran)}
        </div>
        <img src={flower} alt="" className="flower-reverse" style={{ width: "50%" }} />
      </div>
    </div>
  )
}

export default LoveStory