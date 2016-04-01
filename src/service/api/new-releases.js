class NewReleases {

    constructor ($http) {

        this.http = $http;
    }

    get () {

        return this
            .http
            .get('/api/browse/new-releases')
            .then(response => response.data.albums.items);
    }
}

export default ['$http', $http => new NewReleases($http)];
