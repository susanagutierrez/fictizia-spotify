import Controller from './controller';
import template from './template.html';
import style from './style.css';

export default {
    abstract    : true,
    url         : '',
    controller  : () => new Controller(),
    controllerAs: 'private',
    template
};
