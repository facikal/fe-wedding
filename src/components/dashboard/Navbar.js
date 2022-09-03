import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset } from '../../features/authSlice'
import './dashboard.css'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)

  const logout = () => {
    dispatch(LogOut())
    dispatch(reset())
    navigate("/")
  }

  return (
    <div className="nav-dashboard">
      <p>Admin Dashboard</p>
      <button onClick={logout}> <i className="bi bi-box-arrow-left"></i>Logout</button>
    </div>
  )
}

export default Navbar