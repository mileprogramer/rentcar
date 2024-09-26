import axios from "axios";

export default class userSerice {
    static defaultUrl = "http://localhost:8000/api/users";

    static getUsers() {
        const url = this.defaultUrl;
        return axios.get(url)
            .then(response => {
                return {
                    "users" : response.data.data, 
                };
            })
            .catch(error => Promise.reject(this.handleError(error)));
    }

}