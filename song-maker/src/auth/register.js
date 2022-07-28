import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./login.css";
 
function Register() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    const onClickSign = () => {
        axios.post('/api/register',JSON.parse(JSON.stringify({
            "id": inputId,
            "pw": inputPw
        }))
        , {
            headers: {"Content-Type": 'application/json'},
        })
        .then(res=>{
            console.log(res)
        })
        .catch()
        
    }

    const onClick_toLogin = () => {
        window.location.href = "/login"
    }

    return(
        
        <div className="entire_box">
            <div className="head_box">Register</div>
            <div className="id_box">
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div className="pw_box">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
            <button type='button' onClick={onClickSign}>Sign</button>
            </div>
            <div>
            <button type='button' onClick={onClick_toLogin}>Go to Login</button>
            </div>
        </div>
        
    )
}
 
export default Register;