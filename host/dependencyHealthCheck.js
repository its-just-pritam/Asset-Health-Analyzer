const fetch = require('node-fetch');

/*
 * A Sample method to show how to consume dependent API call
 * Return the users list fetched
 */
getUsers = async() => {
  baseURL = process.ENV.DEPENDENT_SERVICE_BASE_URL; 
  let userlist = [];
    if (baseURL) {
      userlist = await fetch(baseURL + '/api/users');
    }

    return userlist;
}

/*
 * Checks the health of dependencies
 */
checkDependencyHealth = async() => {
    try {
        baseURL = process.env.DEPENDENT_SERVICE_BASE_URL; 
        if (!baseURL) {
          return true;
        }
        const resp = await fetch(baseURL + '/health/liveness');
        const status = await resp.status;
        if (status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (Error) {
            return false;
      }
}

module.exports = {
  checkDependencyHealth,
  getUsers
};