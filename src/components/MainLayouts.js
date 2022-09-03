import { useState, useEffect } from 'react'
import Header from "./header/Header";
import Opening from "./opening/Opening";
import Doa from "./doa/Doa";
import Flower from "../assets/img/flower.png"
import song from "../assets/audio/song.mp3"
import CoupleInfo from "./coupleinfo/CoupleInfo";
import AkadNikah from "./akadnikah/AkadNikah";
import Resepsi from "./resepsi/Resepsi";
import Nav from "./nav/Nav";
import LoveStory from "./love-story/LoveStory";
import Gallery from "./gallery/Gallery";
import Gift from './gift/Gift';
import Protocol from './protocol/Protocol';
import LiveStreaming from './live-streaming/LiveStreaming';
import Comment from './comment/Comment';
import Footer from './footer/Footer';


function App() {

  // audio
  const [audio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing) {
      audio.play()
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  },
    [playing]
  );

  // get url params
  const [to, setTo] = useState('')
  const nama = new URLSearchParams(window.location.search).get('to');
  useEffect(() => {
    setTo(nama)
  }, [nama])
  // end of get url params

  return (
    <>
      <Opening flower={Flower} playing={playing} setPlaying={setPlaying} to={to} />
      <Header flower={Flower} to={to} />
      <Doa flower={Flower} />
      <CoupleInfo />
      <AkadNikah flower={Flower} />
      <Resepsi flower={Flower} />
      <LoveStory flower={Flower} />
      <Gallery />
      <Gift />
      <Protocol />
      <LiveStreaming />
      <Comment />
      <Footer />
      <Nav playing={playing} setPlaying={setPlaying} to={to} />
    </>
  );
}

export default App;
