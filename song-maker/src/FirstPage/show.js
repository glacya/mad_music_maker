import { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

import Main from './Main';
import Product from './Product';
import NotFound from './NotFound';
import Header from './Header';

export default function App(){
    return(
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/product/:productId" element={<Product />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}