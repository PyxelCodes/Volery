export const baseURL = window.location.protocol + '//' + window.location.hostname + '/api'
export const gatewayURL = process.env.NODE_ENV == 'production' ? 'wss://api.volery.me/gateway' : `ws://localhost:4001/gateway`