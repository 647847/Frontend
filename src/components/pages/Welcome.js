import React from 'react';
import { Redirect } from 'react-router-dom';
import welcome from './welcome5.png';

export function Welcome() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    console.log("login first")
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <marquee direction="right" className='font'><b><i><big><big><h1>Welcome to Certificate Management system!!</h1></big></big></i></b></marquee>
      <img src={'https://img.freepik.com/free-vector/gradient-ssl-illustration_23-2149266851.jpg?w=740&t=st=1695634505~exp=1695635105~hmac=3e7f0dd38b929f56005ed52a464d896861ffa9fdb960827808594e523d10c158.jpg'} className='img-fluid' alt='Responsive image'
        style={{ width: '100%', maxWidth: '400px', margin: '0 auto'}}></img>
    </div>
  );
}