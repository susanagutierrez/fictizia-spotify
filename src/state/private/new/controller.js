export default class PrivateNewController {

    constructor (newReleases) {

        newReleases
            .get()
            .then(albums => this.albums = albums);
    }
}