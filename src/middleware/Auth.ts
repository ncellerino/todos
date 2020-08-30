import passport from 'passport';
import User from '../models/User';
import passportJWT from 'passport-jwt';
import { IUserService } from '../services/UserService';
import TYPES from '../types';
import passportLocal from 'passport-local';
import { Router } from 'express';
import { bindDependencies } from '../config/Inversify/Container';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

let userService: IUserService | undefined;

export const handleAuthentication = (router: Router) => {
  configureService();
  router.use(passport.initialize());

  // passport.use(new LocalStrategy(User.authenticate()));
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  // passport.use(
  //   new LocalStrategy(
  //     {
  //       usernameField: "email",
  //       passwordField: "password",
  //     },
  //     function (email, password, cb) {
  //       cb(null);
  //     }
  //   )
  // );

  const strategyOpts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ILovePokemon',
  };

  passport.use(
    new JWTStrategy(strategyOpts, (jwtPayload: any, done: any) => {
      // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      let user = null;
      if (userService) {
        user = userService.getById(jwtPayload.sub);
      }
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.',
        });
      } else {
        done(null, user);
      }
    }),
  );
};

let configureService = (userServiceInj?: IUserService) => {
  userService = userServiceInj;
};

configureService = bindDependencies(configureService, [TYPES.UserService]);
