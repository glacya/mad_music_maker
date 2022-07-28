import axios from 'axios';
import React, { useEffect, useState} from 'react';

const MusicList = () => {
    // TODO: use user ID here.
    const id = localStorage.get("id");
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
            <h3>{props.music_id}  {props.music_name}</h3>
            <a href={`http://192.249.18.201:443/api/audio/${props.music_id}.wav`} download>Link</a>
        </div>
    )
}

export default MusicList;