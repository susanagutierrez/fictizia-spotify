import Controller from './controller';
import template from './template.html';
import breadcrumbs from './breadcrumbs.html';

export default {
    url  : '/search',
    views: {
        '': {
            controller  : ['newReleases', newReleases => new Controller(newReleases)],
            controllerAs: 'search',
            template
        },
        'breadcrumbs': {
            template: breadcrumbs
        }
    }
};
