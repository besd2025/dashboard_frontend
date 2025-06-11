import axios from 'axios';

const server="http://192.168.88.33/api/"
const token={
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5NDc3MTU3LCJpYXQiOjE3NDk0NzY4NTcsImp0aSI6ImJmMWEzMTZlYjc5ZTQzZTE4YzQ2MmZlNTkyNGRlZWQ0IiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6IklyYWR1a3VuZGEiLCJsYXN0X25hbWUiOiJFbHZpcyIsInBob25lIjoiNjk5Nzg2NDgiLCJpZGVudGlmaWFudCI6IkJVSkpIQ1ZWIiwiaXNfYWN0aXZlIjp0cnVlLCJ1bmlxdWVfY29kZSI6IjU2MTcifQ.dyqOjAFnoPUZ8XYNXL_zdMpZ4YHi-lIhyd07dH4WAbw",
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
      if(method=="get"){
     return response.data
      }
       else{
        return response.status
       }
    } catch (error) {
        console.error('Request failed', error);
        throw error;  
    }
};
