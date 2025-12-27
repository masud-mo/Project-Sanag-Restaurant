const foodApi = "https://foodish-api.com"
 function displayApi() {
    return axios.get(foodApi) .then((response) => console.log (response) )
 }
 displayApi()