import React from 'react';

import GoogleAuth from '../Auth/googleAuth';

function MainLayout () {
    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center', padding: "10px 20px"}}>
            <h1>PT-WEB-04</h1>
            <GoogleAuth />
        </div>
    )
}

 
export default MainLayout;