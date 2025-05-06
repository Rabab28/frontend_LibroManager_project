import axios from "axios"

const baseUrl = 'http://127.0.0.1:8000/api'


function setTokens(access,refresh) {
    // Save the access and refrech tokens to local storage
    if (access) localStorage.setItem('access_token', access)
    if (refresh) localStorage.setItem('refresh_token', refresh)
}
// function to deal with the token
// async function authorizedRequest(method, url, data)
async function authorizedRequest(method, url, data = null) {
    // make config object for axios to use to make requests
    const config = {
        method,
        url: `${baseUrl}${url}`,
        headers: {}
    }
    // if there is json data add it to the config object
    if (data){
        config.data = data
    }

    // if there is an access token add it to the headers in config object
    const accessToken = localStorage.getItem('access_token')
    if (accessToken){
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    // Actually make the api call to our backend
    try {
        const response = await axios(config)
        return response
    } catch (err) {
        console.log(err) 
    }
}
export {setTokens, authorizedRequest}
