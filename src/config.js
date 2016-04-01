import LoginState from './state/login';
import PrivateState from './state/private';
import PrivateNewState from './state/private/new';
import PrivateSearchState from './state/private/search';

const dependencies = [
    '$compileProvider',
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider'
];

export default [...dependencies, (compile, location, router, state) => {

    compile.debugInfoEnabled(process.env.NODE_ENV !== 'production');

    location.html5Mode({
        enabled    : true,
        requireBase: false
    });

    state
        .state('login', LoginState)
        .state('private', PrivateState)
        .state('private.new', PrivateNewState)
        .state('private.search', PrivateSearchState);

    router.otherwise('/');
}];