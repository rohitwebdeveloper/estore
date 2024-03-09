import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Pagenotfound = () => {

  const navigate = useNavigate();

  const backhomeClick = () => {
    navigate('/')
  }

  return (
    <>
      <div className="notfoundContainer" style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="notfound" style={{
          fontSize: '3.5rem',
          fontFamily: ' system-ui, sans-serif'
        }}>Page Not Found !</div>
        <div className='notfound' style={{
          fontSize: '3.5rem',
        }} >404</div>

        <button style={{
          backgroundColor: '#ff0060',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          color: 'white',
          fontSize: '1rem',
          fontFamily: 'system-ui, sans-serif',
          margin: '15px'
        }} onClick={backhomeClick} >Back To Home</button>
      </div>
    </>
  )
}
