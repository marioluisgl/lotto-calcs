
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import passportBearer from 'passport-http-bearer';
import passportLocal from 'passport-local'

import { GLOBAL_CONFIG } from "../config/global.config";
import { IUser, User } from "../models/user.model";
import { GlobalService } from '../services/impl/global.service';

const BearerStrategy = passportBearer.Strategy;
const LocalStrategy = passportLocal.Strategy; 

export class AuthLocal extends GlobalService {
    constructor() {
        super();
        this._model = User;
        this._populate = [];

        this._serializeUser();
        this._deserializeUser();
        this._useLocalStrategy();
        this._useBearer();
    }

    public getToken(data: any): string {
        const userReduced = (({_id, name, lastname, email, gender, password, role}) => ({
            _id,
            name,
            lastname,
            email,
            password,
            role,
            gender
        }))(data);
        return jsonwebtoken.sign(userReduced, GLOBAL_CONFIG.authorization.secret, {expiresIn: '100d'});
    }

    private _serializeUser() {
        passport.serializeUser((user: IUser, done) => {
            done(null, user.email);
        });
    }

    private _deserializeUser() {
        passport.deserializeUser((email: any, done) => {
            this._findOne({email: email.toLocaleLowerCase()}).then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
        });
    }

    private _useLocalStrategy() {
        passport.use(new LocalStrategy({username: 'email', passReqToCallback: true}, (req, email, password, done) => {
            this._findOne({ email: email.toLocaleLowerCase()}).then(async (user) => {
                if (!user) { 
                    return done(null, false, {message: 'Errors.email_not_found' }); 
                }

                if (!user.active) { 
                    return done(null, false, {message: 'Errors.user_not_active' }); 
                }
                
                if (!user.verifyPassword(password)) { 
                    return done(null, false, {message: 'Errors.wrong_password' }); 
                }

                const token = this.getToken(user);
                delete user._doc.password;
                delete user._doc.valid_token;
                
                return done(undefined, true, {user, token});
            }).catch(err => {
                return done(err, false);
            });
        }));
    }

    private _useBearer() {
        passport.use(new BearerStrategy((token, done) => {
            try {
                jsonwebtoken.verify(token, GLOBAL_CONFIG.authorization.secret, (err, decoded) => {
                    if(err) {
                        done( null, false, 'Errors.wrong_token' );
                    }else {
                        this._findOne({_id: decoded._id, active: true}, undefined, [], {
                            lean: true,
                            projection: 'name lastname email password role'
                        }).then(data => {
                            if (!data) {
                                done(null, false);
                            } else {
                                if (data.password === decoded.password) {
                                    done(null, data);
                                } else {
                                    done(null, false);
                                }
                            }
                        });
                    }
                });
                
            } catch (error) {
                done(null, false)
            }
        }));
    }
}