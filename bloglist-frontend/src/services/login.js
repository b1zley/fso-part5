import axios from 'axios'
const baseUrl = '/api/login'




const login = async (credentials) => {
    // have to send post request with credentials passed to login

    //post request must be sent to baseUrl
    const response =
        await axios.post(baseUrl, credentials)

    return response.data
}



export default { login }


