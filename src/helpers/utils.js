import React, { useEffect, useRef } from 'react';

// export const backendUrl = 'http://dev-v3.sealtabs.com:3004'
// export const backendUrlNew = 'http://dev-v3.sealtabs.com:3004'
export const backendUrl = 'http://03b9-2406-7400-63-1a40-00-102.ngrok.io:3004'

// /* API Response Helpers */
//
export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) return response
    if (401 === response.status && response.statusText !== '') {
        let error = new AuthError(response.statusText)
        throw error
    } else {
        let error = new ApiError(response.statusCode)
        throw error
    }
}

export const parseJSON = response => response.json()

export const composeAuth = jwt => 'Bearer ' + jwt

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}