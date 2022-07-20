import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import AuthContext from '.';
import jwt_decode from 'jwt-decode'

function GoogleAuth() {

    const { user, setUser } = useContext(AuthContext)

    return ( 
        <GoogleLogin
            onSuccess={credentialResponse => {

                const { credential } = credentialResponse;
                const decoded_user = jwt_decode(credential)

                const {name, email, picture} = decoded_user;

                setUser({ name, email, picture });

            }}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap={true}
        />
    );
}
 
export default GoogleAuth;