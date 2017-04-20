/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const dishesController = controllers && controllers.dishes;
const ordersController = controllers && controllers.orders;
const restaurantStatsController = controllers && controllers.restaurantStats;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (dishesController) {
    app.get('/api/dish/:id?', dishesController.all);
    app.post('/api/dish', dishesController.add);
    app.put('/api/dish/:id', dishesController.update);
    app.delete('/api/dish/:id', dishesController.remove);
  } else {
    console.warn(unsupportedMessage('Dish routes'));
  }

  if (ordersController) {
    app.get('/api/order/:id?', ordersController.all);
    app.post('/api/order', ordersController.add);
    // app.put('/api/order/:id', ordersController.update);
    // app.delete('/api/order/:id', ordersController.remove);
  } else {
    console.warn(unsupportedMessage('Order routes'));
  }

  if (restaurantStatsController) {
    app.get('/api/stats/restaurant/:id/least-sold-dish', restaurantStatsController.leastSoldDish);
    app.get('/api/stats/restaurant/:id/most-sold-dish', restaurantStatsController.mostSoldDish);
    app.get('/api/stats/restaurant/:id/earnings', restaurantStatsController.earnings);
  } else {
    console.warn(unsupportedMessage('restaurantStats routes'));
  }
};
