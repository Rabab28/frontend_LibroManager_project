function setTokens(access,refresh) {
    // Save the access and refrech tokens to local storage
    if (access) localStorage.setItem('access_token', access)
    if (refresh) localStorage.setItem('refresh_token', refresh)
}

export {setTokens}
