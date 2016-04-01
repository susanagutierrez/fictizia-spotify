export default ['$rootScope', '$state', (scope, state) => scope.$on('$stateChangeStart', (event, toState) => {

    if (toState.name !== 'login' && !window.user) {

        event.preventDefault();
        state.go('login');
    }
})];