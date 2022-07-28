import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

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