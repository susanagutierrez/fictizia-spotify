if (process.env.NODE_ENV) {

    return;
}

const fs     = require('fs'),
      crypto = require('crypto'),
      prompt = require('prompt');

const schema = {
    properties: {
        clientID: {
            description: 'Spotify Client ID',
            message    : 'Copy it from https://developer.spotify.com/my-applications/#!/applications',
            required   : true
        },
        clientSecret: {
            description: 'Spotify Client Secret',
            message    : 'Copy it from https://developer.spotify.com/my-applications/#!/applications',
            required   : true
        },
        port: {
            description: 'local site port',
            type       : 'integer',
            default    : 5000
        },
        proxyPort: {
            description: 'webpack proxy port',
            type       : 'integer',
            default    : 5001
        }
    }
};

prompt.message = '';
prompt.start();
prompt.get(schema, (error, result) => {

    result.sessionSecret = crypto.randomBytes(16).toString('hex');
    fs.writeFileSync('config.json', JSON.stringify(result, null, 4));
});