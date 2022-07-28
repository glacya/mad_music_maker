import { Link } from 'react-router-dom';
import React from 'react';

const Entrance = () => {
    return (
        <div>
                <Link to="/song_maker_group">
                <button>SongMaker</button>
                </Link>
                <Link to="/music_list">
                <button>My Music</button>
                </Link>
        </div>
    )
};

export default Entrance;