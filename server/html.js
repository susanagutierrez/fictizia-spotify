module.exports = user => {

    if (user) {

        user = JSON.stringify(user);
    }

    return `<!DOCTYPE html>
<html lang="es" ng-app="app">
    <head>
        <title>Fictizia</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
        <link rel="stylesheet" href="/app.css">
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
        <script>user = ${ user };</script>
        <script defer src="/app.js"></script>
    </head>
    <body ui-view></body>
</html>`;
}
