import angular from 'angular';

import newReleases from './new-releases';

export default angular
    .module('app.service.api', [])
    .service('newReleases', newReleases)
    .name;