import React from 'react'
import {Link} from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import LoginIcon from '@mui/icons-material/Login'

const Navbar = () => {
  return (
    <div className='font-["Poppins"] text-sky-100 shadow-md shadow-sky-100'>
      <nav className='bg-sky-400 h-16 p-4'>
        <div className='flex justify-between'>
          <Link className='font-["Satisfy"] text-3xl hover:text-hover-green cursor-pointer text-slate-800 font-semibold' to="/"><StyleRoundedIcon /> Flashy</Link>
          <Link className='cursor-pointer hover:text-hover-green text-lg' to="/"><HomeRoundedIcon fontSize='small' /> Home</Link>
          <Link className='cursor-pointer hover:text-hover-green text-lg' to="/"><HelpRoundedIcon fontSize='small' /> How to Use?</Link>
          <Link className='cursor-pointer hover:text-hover-green text-lg' to="/"><AccountCircleRoundedIcon fontSize='small' /> Contact</Link>
          <Link className='cursor-pointer hover:text-hover-green text-lg' to="/login"><LoginIcon fontSize='small' />{localStorage.getItem("login") ? " Logout" : " Login"}</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
