import axios from "axios";

export const hostname = "http://localhost:8000/";
export const frontendUrl = "http://localhost:3000/"

export const defaultAxiosSettings = () => {
    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;
    axios.get(hostname + "sanctum/csrf-cookie/");
}