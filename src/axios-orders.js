import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-78d0d.firebaseio.com/"
});

export default instance;