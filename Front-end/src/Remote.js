import axios from 'axios';

const remote = axios.create({
  baseURL: `http://localhost:3300`,
});

const login = (body)=>{
    return remote.post('/login',body);
}

export {
    login
}