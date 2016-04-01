import Controller from './controller';
import template from './template.html';
import style from './style.css';

export default {
    url         : '/',
    controller  : ['newReleases', newReleases => new Controller(newReleases)],
    controllerAs: 'new',
    template
};
