import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

function GoogleOAuth() {
    const [credentialResponse, setCredentialResponse] = useState({});

    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse)
                    setCredentialResponse(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />
            <div>
                <pre style={{fontSize: 12}}>
                    {JSON.stringify(credentialResponse, null, 2)}
                </pre>
            </div>
            
        </div>
    );
}

export default GoogleOAuth;