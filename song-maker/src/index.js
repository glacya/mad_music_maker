import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppSongMaker from './SongMakerSelf/AppSongMaker';
import SongMakerGroup from './SongMakerGroup/SongMakerGroup';
import Entrance from './entrance/Entrance';
import MusicList from './music_list/Musiclist';
import Login from './auth/login';
import Register from './auth/register';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SongMakerSelf from './SongMakerSelf/SongMakerSelf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Entrance />}></Route>
    <Route exact path="/music_maker" element={<AppSongMaker/>}></Route>
    <Route exact path='/song_maker_group' element={<SongMakerGroup/>}></Route>
    <Route exact path='/music_list' element={<MusicList/>}></Route>
    <Route exact path="/login" element={<Login/>}></Route>
    <Route exact path="/register" element={<Register/>}></Route>
    {/* <Route path='/songMaker' render={()=><SongMakerSelf />}/> */}
=
  </Routes>
</BrowserRouter>
  // <React.StrictMode>
  //   {/* <AppSongMaker /> */}
  //   <SongMakerGroup/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
