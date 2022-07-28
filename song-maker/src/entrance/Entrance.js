import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import musicImg1 from '../SongMakerSelf/img/music.png'

const Entrance = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id === null) {
            navigate('./login');
        }
        else {
            localStorage.removeItem(id);
        }
    });

    return (
        <div>
        <div className='inputs'>
                <img src={musicImg1} 
                width="30"
                height="30" 
                alt="music"
                className='AppSongMakerSrc'/>
                <div className='header'>Music Maker</div>
            </div>
        <div className='LinkTo'>
                <Link to="/song_maker_group">
                <input className='SongMaker' type="button"/>
                <strong className='real'>SongMaker</strong>
                {/* <button>SongMaker</button> */}
                </Link>
                <Link to="/music_list">
                <input className='MyMusic' type="button"/>
                <strong className='real'>My Music</strong>
                {/* <button>My Music</button> */}
                </Link>
        </div>
        </div>
    )
};

export default Entrance;