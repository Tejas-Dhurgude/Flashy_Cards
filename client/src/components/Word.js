import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Word = (props) => {

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/card/${id}`, {
                method: "DELETE"
            })
            console.log(response)
            window.location.reload()
        } catch (err) {
            console.error(err.message)
        }
    }

    const editItem = async (id) => {
        const meaning = prompt("Enter correct meaning :")
        try {
            const response = await fetch(`http://localhost:5000/card/${id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    meaning: meaning,
                }
                )
            })
            console.log(response)
            window.location.reload()
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <div className='m-3 p-4 rounded-lg bg-white text-stone-800 font-medium w-72'>
                <h1 className='bg-slate-200 p-2 m-2 font-bold text-center'>{props.word}</h1>
                <div className='p-5 m-2'>
                    <p className=''>{props.meaning}</p>
                    <p className='text-sm text-slate-400'>{props.time}</p>
                </div>
                {localStorage.getItem("login") && <div className='flex justify-between'>
                    <button className='' onClick={() => editItem(props.id)}>
                        <EditIcon />
                    </button>
                    <button className='' onClick={() => deleteItem(props.id)}>
                        <DeleteOutlineIcon />
                    </button>
                </div>}
            </div>
        </>
    )
}

export default Word
