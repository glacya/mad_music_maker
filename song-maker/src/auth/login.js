import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./login.css";
import {useNavigate} from 'react-router-dom'
 
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
            <div className="head_box">Login</div>
            <div className="id_box">
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div className="pw_box">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
                <button type='button' onClick={onClickRegister}>Register</button>

            </div>
        </div>
        
    )
}
 
export default Login;