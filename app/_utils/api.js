import axios from 'axios';

const server="http://192.168.88.250/api/"
const token={
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5MTIwNTYwLCJpYXQiOjE3NDkxMjAyNjAsImp0aSI6IjZmYTFiNmNlMGY2YjQ3ODhiYjVhNzIwZGNkMjk3ZTEwIiwidXNlcl9pZCI6NCwiZmlyc3RfbmFtZSI6IklyYWR1a3VuZGEiLCJsYXN0X25hbWUiOiJFbHZpcyIsInBob25lIjoiNjk5Nzg2NDgiLCJpZGVudGlmaWFudCI6IkJVSkhRSllDIiwiaXNfYWN0aXZlIjp0cnVlLCJ1bmlxdWVfY29kZSI6IjI5MDkifQ.kLgcTJlUA9OYru53McqGjXIQGobqBH3XFSlWQ-A-j6o",
    "token_type": "Bearer",
            }

export const api = axios.create({
    baseURL: server, 
    headers: {
        Authorization: `${token.token_type} ${token.access_token}`, 
    },

});
export const fetchData = async (method, url, {params = {}, body = null, additionalHeaders = {}}) => {
    try {

        const headers = {
            ...api.defaults.headers,
            ...additionalHeaders,
        };

        const response = await api({
            method,  
            url,     
            params,  
            data: body,  
            headers,  
        });

        return response.data;
    } catch (error) {
        console.error('Request failed', error);
        throw error;  
    }
};
