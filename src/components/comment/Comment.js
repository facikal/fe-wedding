import React from 'react'
import CommentList from './CommentList'
import './comment.css'

const Comment = () => {
  return (
    <div className="container ucapan">
      <h2>Ucapan Selamat</h2>
      <span>Berikan Ucapan & Do'a Restu</span>
      <div className="ucapan-box">
        <CommentList />
      </div>
    </div>
  )
}

export default Comment