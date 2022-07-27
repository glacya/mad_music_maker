import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Product(props){
    const { productId } = useParams();
    const navigate = useNavigate();
    
    return(
        <>
            <h3>{productId}번 Product Page</h3>
            <ul>
                <li><button onClick={()=>navigate('/')}>Go Root</button></li>
            </ul>
        </>
    )
}