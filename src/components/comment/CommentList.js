import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate'
import AddComment from './AddComment';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [totalHadir, setTotalHadir] = useState(0)
  const [totalTidakHadir, setTotalTidakHadir] = useState(0)
  const [totalMasihRagu, setTotalMasihRagu] = useState(0)
  
  useEffect(() => {
    getComment();
  }, [page]);

  const getComment = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/comment?page=${page}&limit=${limit}`)

    setComments(response.data.result)
    setPage(response.data.page)
    setPages(response.data.totalPage)
    setRows(response.data.totalRows)
    setTotalHadir(response.data.totalHadir)
    setTotalTidakHadir(response.data.totalTidakHadir)
    setTotalMasihRagu(response.data.totalMasihRagu)
  };

  const changePage = (e) => {
    setPage(e.selected)
  }
  const handleComment = (comment, i) => {

    const created = new Date(comment.createdAt).getTime()

    const now = new Date().getTime()
    const distance = now - created;

    const seconds = Math.floor(distance / 1000);
    const minutes = Math.floor(distance / (1000 * 60));
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 7 * 4));
    const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 7 * 4 * 12));



    const uploadTime = () => {
      let time;
      if (seconds >= 60) {
        time = `${minutes} menit lalu`
      }
      if (minutes >= 60) {
        time = `${hours} jam, ${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))} menit lalu`
      }
      if (hours >= 24) {
        time = `${days} hari, ${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} jam lalu`
      }
      if (days >= 7) {
        time = `${weeks} minggu, ${Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))} hari lalu`
      }
      if (weeks >= 4) {
        time = `${months} bulan, ${Math.floor((distance % (1000 * 60 * 60 * 24 * 7 * 4)) / (1000 * 60 * 60 * 24 * 7))} minggu lalu`
      }
      if (months >= 12) {
        time = `${years} tahun, ${Math.floor((distance % (1000 * 60 * 60 * 24 * 7 * 4 * 12)) / (1000 * 60 * 60 * 24 * 7 * 4))} bulan lalu`
      }
      if (seconds < 59) {
        time = `baru saja`
      }
      return time
    }

    const x = setInterval(() => {
      uploadTime()
    }, 1000)
    clearInterval(x)


    return (
      <div key={comment.id} className="comment-item">
        <div className='comment-name'>
          <div >
            <i className="bi bi-envelope-check"></i>
          </div>
          <div className='name'>
            <p>
              {comment.nama} |
              {comment.kehadiran === "Hadir" ? <i className="bi bi-check-square-fill hadir"> Hadir</i> : ""}
              {comment.kehadiran === "Tidak Hadir" ? <i className="bi bi-x-square-fill tidak-hadir"> Tidak Hadir</i> : ""}
              {comment.kehadiran === "Masih Ragu" ? <i className="bi bi-question-square-fill masih-ragu"> Masih Ragu</i> : ""}
            </p>
          </div>
        </div>
        <hr style={{ margin: "15px 0 0" }} />
        <div className='comment-name'>
          <div className='comment-ucapan'>
            <div>
              <p>
                Ucapan :
              </p>
            </div>
            <div>
              <p>
                {comment.ucapan}
              </p>
            </div>
            <div className='created'>
              <i className="bi bi-clock-history"> {uploadTime()}</i> 
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className='comment-box'>
        <AddComment getComment={getComment} rows={rows} totalHadir={totalHadir} totalTidakHadir={totalTidakHadir} totalMasihRagu={totalMasihRagu} setPage={setPage} />
        <div className='scroll'>
          {comments.map(handleComment)}
        </div>
        <div className='pagination'>
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName='pagination-list'
          />
        </div>
      </div>

    </React.Fragment>
  )
}

export default CommentList