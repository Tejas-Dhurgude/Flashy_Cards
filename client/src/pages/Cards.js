import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Word from "../components/Word"

const Cards = () => {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/")
    }

    const [word, setWord] = useState([])

    const dict = [
        {
            "word": "happy",
            "meaning": "feeling or showing pleasure or contentment."
        },
        {
            "word": "sad",
            "meaning": "feeling or showing unhappiness or sorrow."
        },
        {
            "word": "big",
            "meaning": "of considerable size, extent, or intensity."
        },
        {
            "word": "small",
            "meaning": "of limited size or significance."
        },
        {
            "word": "fast",
            "meaning": "moving or able to move quickly."
        },
        {
            "word": "slow",
            "meaning": "moving at a low speed."
        },
        {
            "word": "bright",
            "meaning": "emitting or reflecting a lot of light; shining."
        },
        {
            "word": "dark",
            "meaning": "having little or no light."
        },
        {
            "word": "hot",
            "meaning": "having a high degree of heat or a high temperature."
        },
        {
            "word": "cold",
            "meaning": "having a low temperature; lacking warmth."
        }
    ]


    const getWord = async () => {
        try {
            const response = await fetch("http://localhost:5000/cards")
            const data = await response.json()
            setWord(data.data)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getWord()
    }, [])

    const [credentials, setCredentials] = useState({
        word: "",
        meaning: "",
    })

    const handleChange = (e) => {
        const data = e.target.name
        const value = e.target.value
        setCredentials({ ...credentials, [data]: value })
    }

    const handleClick = async (e) => {
        e.preventDefault()

        for (let i = 0; i < dict.length; i++) {
            if (dict[i].word === credentials.word) {
                const response = await fetch('http://localhost:5000/create', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        word: credentials.word,
                        meaning: dict[i].meaning,
                    })
                })
            }
        }

        const response = await fetch('http://localhost:5000/create', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                word: credentials.word,
                meaning: credentials.meaning,
            })
        })

        const json = await response.json()
        console.log(json)
        window.location.reload()
    }

    return (
        <div className='bg-sky-200 p-2'>
            <div className='flex justify-between'>
                <Link className='font-["Satisfy"] text-3xl hover:text-hover-green cursor-pointer text-slate-800 font-semibold' to="/"><StyleRoundedIcon /> Flashy</Link>
                {localStorage.getItem("login") && <button type="submit" className="bg-red-400 rounded-lg p-2 font-semibold w-20 hover:bg-red-500 border-sky-100" onClick={handleLogOut}>LogOut</button>}
            </div>
            {localStorage.getItem("login") && <div className='flex justify-center'>
                <div className="m-5">
                    <label htmlFor="word" className="text-xl bg-slate-100 p-2 m-5 rounded-md">Word :</label>
                    <input type="" className="border-sky-500 border-2 rounded-sm" name="word" value={credentials.word} onChange={handleChange} autoComplete="off" />
                </div>
                <div className="m-5">
                    <label htmlFor="meaning" className="text-xl bg-slate-100 p-2 m-5 rounded-md">Meaning :</label>
                    <input type="email" className="border-sky-500 border-2 rounded-sm" name="meaning" value={credentials.meaning} onChange={handleChange} autoComplete="off" />
                </div>
                <button className='m-5 text-green-800 cursor-pointer hover:text-green-600 text-base font-semibold' onClick={handleClick}>
                    Add
                    <AddCircleOutlineRoundedIcon fontSize='large' />
                </button>
            </div>}
            <div className="m-2" role="search">
                <input className="m-2 placeholder:italic bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" type="search" placeholder="Find Word..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <div className='bg-sky-100 p-2 flex flex-wrap justify-center'>
                {word
                    .filter((item) => search !== "" ? item.word.toLowerCase().includes(search.toLowerCase()) : true)
                    .map((item) => (
                        <Word key={item._id} id={item._id} word={item.word} meaning={item.meaning} time={item.time} />
                    ))}
            </div>

        </div>
    )
}

export default Cards
