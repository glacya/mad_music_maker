import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppSongMaker from './SongMakerSelf/AppSongMaker';
import SongMakerGroup from './SongMakerGroup/SongMakerGroup';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SongMakerSelf from './SongMakerSelf/SongMakerSelf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<SongMakerGroup />}></Route>
    {/* <Route path='/songMaker' render={()=><SongMakerSelf />}/> */}
    {/* <Route path="/hello" element={<Product />}></Route> */}
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
