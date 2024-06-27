import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import flashy from '../images/flashy.gif'

const Home = () => {

  const navigate = useNavigate()
  
  return (
    <div className='h-screen bg-cover bg-sky-cloud'>
      <Navbar />
      <div className='flex m-32 justify-around place-items-center'>
        <img className='border-4 rounded-3xl shadow-md border-sky-300 h-80' src={flashy} alt="flashy-img" />
        <div>
          <h1 className='text-4xl p-5 font-semibold bg-white text-slate-900 rounded-lg'>Let's Play With Flashcards.</h1>
          <button className='bg-green-400 rounded-lg p-3 m-4 mx-auto w-20 hover:bg-green-500 border-sky-100' onClick={() => navigate("/cards")}>Play</button>
        </div>
      </div>
    </div>
  )
}

export default Home
