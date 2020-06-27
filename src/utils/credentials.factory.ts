import Credentials from '../model/credentials';

function createMongoUri(credentials: Credentials) {
    return 'mongodb+srv://'
        .concat(credentials.user).concat(':')
        .concat(credentials.password).concat('@')
        .concat(credentials.path).concat('/')
        .concat(credentials.db).concat('?')
        .concat(credentials.params);
}

export { createMongoUri };
