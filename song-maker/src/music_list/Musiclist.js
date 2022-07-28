import axios from 'axios';
import React, { useEffect, useState} from 'react';
import musicImg from '../SongMakerSelf/img/music.png'
import musicImg1 from '../SongMakerSelf/img/playgif.gif'

const MusicList = () => {
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

    return (
        <div>
            {songs.map(song => {
                return <MusicElement music_id={song.music_id} music_name={song.music_name}/>
            })}
        </div>
    )
};

const MusicElement = (props) => {
    // TODO: care design here
    return (
        <div>
            <div className='inputs'>
                <img src={musicImg} 
                width="30"
                height="30" 
                alt="music"
                className='AppSongMakerSrc'/>
                <div className='header'>Music Maker</div>
            </div>
            <h3>{props.music_id}. {props.music_name}</h3>{/*{props.music_id}.*/}
            <span className='hov-anim-box'>
                <img src={musicImg1} 
                    width="10"
                    height="10" 
                    alt="music"
                    className='playImg'/>
            
            
            <a className='playLink' href={`http://192.249.18.201:443/api/audio/${props.music_id}.wav`} download>Play</a>
            </span>
        </div>
    )
}

export default MusicList;