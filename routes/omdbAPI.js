const axios = require('axios').default;

// KEY API
const API_KEY = "d9f878fc";

// URL API
const API_URL = "http://www.omdbapi.com/";


class omdbAPI {
    constructor(){
    }

    // Requete à l'API omdb
    fetchTitle(Title){
        return axios
            .get(`${API_URL}?t=${Title}&apikey=${API_KEY}`, {
                crossdomain: true
            })
    }
}

module.exports = omdbAPI;