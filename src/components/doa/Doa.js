import React from 'react'
import Basmallah from '../../assets/img/basmallah.png';
import './doa.css'

const Doa = ({ flower }) => {
  return (
    <div className="doa">
      <div data-aos="fade-up"
        data-aos-anchor-placement="center-bottom">
        <img src={Basmallah} />
        <p>اَللهُمَّ اغْفِرْلِىْ ذُنُوْبِىْ وَلِوَالِدَىَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِىْ صَغِيْرًا </p>
        <p>Artinya :</p>
        <p>Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
        <p>QS. Ar-Rum 21</p>
        <img src={flower} alt="" className="flower-reverse" />
      </div>
    </div>
  )
}

export default Doa