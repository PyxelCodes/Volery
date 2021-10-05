import User from '../../../schemas/user';
import passport from 'passport';

export default {
    methods: ['GET'],
    get: passport.authenticate('github', { scope: ['user:email'] }),
}