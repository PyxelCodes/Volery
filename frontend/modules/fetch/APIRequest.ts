

export const APIRequest = async (endpoint) => {
    let host = window.config.host;
    let secure = window.config.secure;
    let protocol = secure ? 'https' : 'http'


    let fetched = fetch(`${protocol}://${host}${endpoint}`)
    .then(res => {
        let remaining = res.headers.get('X-RateLimit-Remaining');
        window.apireq.remaining = parseInt(remaining);
    })
    .catch(err => {
        throw err;
    })
}