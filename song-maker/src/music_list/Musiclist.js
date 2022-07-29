import axios from 'axios';
import React, { useEffect, useState} from 'react';
import musicImg from '../SongMakerSelf/img/music.png'
import musicImg1 from '../SongMakerSelf/img/playgif.gif'
import {useNavigate} from 'react-router-dom';

const MusicList = () => {
    let navigate=useNavigate();
    // TODO: use user ID here.
    const id = localStorage.getItem("id");
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`/api/audio_list/${id}`).then((res)=>{
                console.log("RES");
                console.log(res);
                setSongs(res.data);
            });
        }
    }, [id]);
    

    const sendPost=(e)=>{
        e.preventDefault();

        navigate('/');
    }

    return (
        <div>
            <div className='inputs'>
            <input className='send-post2' type="button" onClick={sendPost}/>
                <img src={musicImg} 
                width="30"
                height="30" 
                alt="music"
                className='AppSongMakerSrc'/>
                <div className='header'>Music Maker</div>
                
            </div>
            {songs.map(song => {
                return <MusicElement music_id={song.music_id} music_name={song.music_name}/>
            })}
        </div>
    )
};

const MusicElement = (props) => {
    // TODO: care design here
    const name = props.music_name == "" ? "Unnamed": props.music_name;
    return (
        <div>
            <div className='textPlay'>
            <h3>{name} : </h3>{/*{props.music_id}.*/}
            
            <a className='playLink' href={`http://192.249.18.201:443/api/audio/${props.music_id}.wav`} download>Download</a>
        </div>
        </div>
    )
}

export default MusicList;