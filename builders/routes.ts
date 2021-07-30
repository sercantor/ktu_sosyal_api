import path = require('path');
import * as fs from 'fs';

const validator = require('express-joi-validation').createValidator({});

const getValidations = (validationPath) => {
  const validations = [];
  const validation = require(path.join('../src/validations/', validationPath));
  for (const [type, schema] of Object.entries(validation)) {
    validations.push(validator[type](schema));
  }

  return validations;
};

const getMiddlewares = (middlewares) => middlewares.reduce((acc, middlewareDetail) => {
  if (typeof middlewareDetail === 'string') {
    const middleware = require(path.join('../src/middlewares/', middlewareDetail));
    return acc.concat(middleware);
  } if (typeof middlewareDetail === 'object') {
    const middlewaresWithParams = Object.keys(middlewareDetail).map((middlewarePath) => {
      const middleware = require(path.join('../src/middlewares/', middlewarePath));
      return middleware(...middlewareDetail[middlewarePath]);
    });
    return acc.concat(...middlewaresWithParams);
  }
  return acc;
}, []);

export const routeBuilder = (app) => {
  const routeDir = path.join(process.cwd(), 'src/routes');
  fs.readdirSync(routeDir).forEach((file) => {
    require(path.join(routeDir, file)).forEach((route) => {
      const params = [];
      params.push(route.path);
      if (route.middlewares) {
        const middlewares = getMiddlewares(route.middlewares);
        params.push(...middlewares);
      }
      if (route.validation) {
        const validations = getValidations(route.validation);
        params.push(...validations);
      }
      params.push(route.handler);
      app[route.method](...params);
    });
  });
};
