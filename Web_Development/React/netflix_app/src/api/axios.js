import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "13130b4005d7ecb25069d6dcf95a6d55",
        Language: "ko-KR",
    },
});

export default instance;