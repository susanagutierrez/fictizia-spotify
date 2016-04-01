const path         = require('path'),
      express      = require('express'),
      bodyParser   = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      http         = require('http'),
      crypto       = require('crypto'),
      passport     = require('passport'),
      Spotify      = require('passport-spotify'),
      request      = require('request'),
      html         = require('./html'),
      config       = require('../config.json');

const web    = path.join(process.cwd(), 'web'),
      app    = express(),
      server = http.Server(app);

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (id, done) {

    done(null, id);
});

passport.use(new Spotify.Strategy({
        clientID    : config.clientID,
        clientSecret: config.clientSecret,
        callbackURL : 'http://localhost:5000/oauth/callback'
    },
    function (accessToken, refreshToken, profile, done) {

        const hash = crypto
            .createHash('md5')
            .update(profile.emails[0].value)
            .digest('hex');

        profile.gravatar = `https://www.gravatar.com/avatar/${ hash }?s=50`;

        done(null, {accessToken, refreshToken, profile});
    }
));

app.use(express.static(web));
app.use(cookieParser());
app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth', passport.authenticate('spotify', {
    scope: [
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-modify',
        'user-read-email'
    ]
}));

app.get('/oauth/callback', passport.authenticate('spotify', {failureRedirect: '/login'}), (req, res) => res.redirect('/'));

app.get('/api/*', bodyParser.json(), (req, res) => {

    if (req.session.passport) {

        request({
            method: req.method,
            uri   : 'https://api.spotify.com/v1' + req.path.slice(4),
            body  : req.body,
            json  : true,
            qs    : req.query,
            auth: {
                bearer: req.user.accessToken
            }
        }).pipe(res);

    } else {

        res.sendStatus(401);
    }
});

app.get('/logout', (req, res) => {

    req.logout();
    res.redirect('/login');
});

app.get(/^[^.]*$/, (req, res) => res.set('Content-Type', 'text/html').send(html(req.user ? req.user.profile : null)));

server.listen(process.env.PORT || config.proxyPort);
