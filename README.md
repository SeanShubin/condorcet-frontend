# Condorcet Frontend

## Prerequisites

Make sure [condorcet-backend](https://github.com/SeanShubin/condorcet-backend) is running

## Scripts

- `./scripts/prepare.sh`
  - One time initialization
- `./scripts/run.sh`
  - Run application
- `./scripts/test.sh`
  - Run the tests
- `./scripts/coverage.sh`
  - Test coverage report

## How this project was created
```bash
npm install -g npm@latest
npx create-react-app condorcet-frontend
cd condorcet-frontend
npm install ramda
npm install redux
npm install react-redux
npm install redux-saga
npm install history
npm install http-proxy-middleware
```

## Proxy setup
Create file `src/setupProxy.js`, with the following contents

```javascript
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    const options = {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/proxy/': '/',
        }
    };
    app.use(
        '/proxy/',
        createProxyMiddleware(options)
    );
};
```

The idea here is to be specific about which http paths should render something from the source directory vs. a proxy to elsewhere.
This helps prevent urls from conflicting in case a path to a proxied resource happens to match a path to a resource in the src directory.
The source code adds the 'proxy' prefix indicating this is a request that should be proxied,
but when proxying out externally, the proxy middleware rewrites the url, removing the proxy prefix.

## Css reset
Add the file [reset.css](http://meyerweb.com/eric/tools/css/reset/),
and import it from index.js `import './reset.css'`

The idea here is to preserve a consistent presentation in spite of different browser css defaults,
and be more explicit and intentional about what css styles are applied

## Technology Stack
- [React](https://reactjs.org/)
- [Ramda](https://ramdajs.com/)
- [React Router](https://reactrouter.com/)
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [history](https://github.com/ReactTraining/history/)
- [Jest](https://jestjs.io/)
  - [expect api](https://jestjs.io/docs/en/expect)
- [Testing Library](https://testing-library.com)
  - [queries](https://testing-library.com/docs/dom-testing-library/api-queries)
- http-proxy-middleware
  - https://github.com/chimurai/http-proxy-middleware
  - https://www.npmjs.com/package/http-proxy-middleware

## Notes

- should look into Json Web Token
  - https://afteracademy.com/blog/implement-json-web-token-jwt-authentication-using-access-token-and-refresh-token

## Nginx
config file is at /usr/local/etc/nginx/nginx.conf

html content symlink is at /usr/local/Cellar/nginx/1.21.6/html
html content is at /usr/local/var/www

to stop nginx `nginx -s quit`

Confirmed to work
```
location  /proxy {
    rewrite /proxy/(.*) /$1 break;
    proxy_pass         http://localhost:8080;
    proxy_redirect     off;
    proxy_set_header   Host $host;
}
```
