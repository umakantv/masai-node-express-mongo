import React from 'react';
import {GoogleLogin} from 'react-google-login';

const responseGoogle = (response) => {
    console.log('User action response', response);
}
const GoogleAuth = () => {

    return ( 
        <GoogleLogin
            clientId=""
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}
 
export default GoogleAuth;