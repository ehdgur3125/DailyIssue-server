module.exports = {
    // authentication
    signUp: require('./signup'),
    login: require('./login'),
    accTokenRequestUser: require('./accTokenRequestUser'),
    rfTokenRequest: require('./rfTokenRequest'),
    callbackGit: require('./oauth/callbackGit'),
    callback: require('./oauth/callback'),
    callbackRf: require('./oauth/callbackRf')
};