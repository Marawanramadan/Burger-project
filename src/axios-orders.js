import axios from 'axios'


const instance = axios.create({
  baseURL : 'https://burger-1e0fd.firebaseio.com/'
})


export default instance;