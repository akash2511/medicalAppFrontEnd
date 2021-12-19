import React, { useEffect, useRef } from 'react';
import customError from 'custom-error'

export const AuthError = customError('AuthError')
export const ApiError = customError('ApiError')

export const backendUrl = 'http://20.127.4.20:3004'

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