import React from 'react'
import './protocol.css'
import Protocol1 from '../../assets/img/protocol1.png'
import Protocol2 from '../../assets/img/protocol2.png'
import Protocol3 from '../../assets/img/protocol3.png'
import Protocol4 from '../../assets/img/protocol4.png'
import Protocol5 from '../../assets/img/protocol5.png'
import Protocol6 from '../../assets/img/protocol6.png'
const Protocol = () => {

  return (
    <div className="protocol-container">
      <h2>Health Protocol</h2>
      <div className="protocol-box">
        <div className="protocol-item">
          <img src={Protocol1} />
            <p>Cuci Tangan</p>
        </div>
        <div className="protocol-item">
          <img src={Protocol2} />
            <p>Gunakan Masker</p>
        </div>
        <div className="protocol-item">
          <img src={Protocol3} />
            <p>Jaga Jarak</p>
        </div>
        <div className="protocol-item">
          <img src={Protocol4} />
            <p>Tidak Berjabat Tangan</p>
        </div>
        <div className="protocol-item">
          <img src={Protocol5} />
            <p>Hindari Kerumunan</p>
        </div>
        <div className="protocol-item">
          <img src={Protocol6} />
            <p>Gunakan Hand Sanitizer</p>
        </div>
      </div>
    </div>
  )
}

export default Protocol