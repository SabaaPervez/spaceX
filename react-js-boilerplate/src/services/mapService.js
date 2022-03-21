import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://lldev.thespacedevs.com/2.2.0"
});

function getData(apiPath, queryParams) {
    // Make a request for a user with a given ID
    return axios.get(apiPath, { params: queryParams })
    .then(function (response) {
        // handle success
        return response;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

const MapService = {getData}

export default MapService;
