import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./login.css";
import {useNavigate} from 'react-router-dom'
import musicImg from '../SongMakerSelf/img/login.png'
import musicImg1 from '../SongMakerSelf/img/music.png'

function Login() {
    let navigate=useNavigate();
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 

    const onClickLogin = () => {
        axios.post('/api/login',JSON.parse(JSON.stringify({
            "id": inputId,
            "pw": inputPw
        }))
        , {
            headers: {"Content-Type": 'application/json'},
        })
        .then(res=>{
            if(res.status==200){
                localStorage.setItem("id",inputId)
                window.location.href = "/"
            }
        })
        .catch()
        
    }

    const onClickRegister=()=>{
        
        navigate('/register');
    }

    return(
        
        <div className="entire_box">
            <div className='inputs'>
                <img src={musicImg1} 
                width="30"
                height="30" 
                alt="music"
                className='AppSongMakerSrc'/>
                <div className='header'>Music Maker</div>
            </div>
            {/* <div className='imgParent'>
            <img src={musicImg} 
            width="80"
            height="80" 
            alt="music"
            className='imgimg'/>
            </div> */}
            {/* <div className="head_box">Login</div> */}
            <div className='inputS'>
            <div className="id_box">
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div className="pw_box">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            </div>
            <div className='inputS'>
                <button type='button' onClick={onClickLogin}>
                    Login
                    {/* <img src='../SongMakerSelf/img/login.png'></img> */}
                </button>
                <button type='button' onClick={onClickRegister}>Register</button>

            </div>
        </div>
        
    )
}
 
export default Login;