import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import AddCoupleInfo from './AddCoupleInfo';
import AddEventImage from './AddEventImage';
import AddEventInfo from './AddEventInfo';
import AddNorek from './AddNorek';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate("/login")
    }
  }, [isError, navigate])

  return (
    <div className='dashboard-box'>
      <Navbar />
      <AddCoupleInfo/>
      <AddEventImage/>
      <AddEventInfo />
      <AddNorek/>
    </div>
  )
}

export default Dashboard