import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../../features/authSlice'
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, messege } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard")
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }))
  }

  return (
    <div className='container container-login'>
      <div className="login-box">
        <h2>LOGIN</h2>
        <hr />
        <div className="login-form">
          <form onSubmit={Auth}>
            <div className="filed">
              <div className="control">
                <input required className="login-input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </div>
            </div>
            <div className="filed">
              <div className="control">
                <input required className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              </div>
            </div>
            {isError && <p>{messege}</p>}
            <div className="filed">
              <button className="is-success login" type='submit'>{isLoading ? "Loading..." : "Login"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login