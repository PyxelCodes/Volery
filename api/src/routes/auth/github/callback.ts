import User from '../../../schemas/user';
import passport from 'passport';

export default {
    methods: ['GET'],
    get: (req: any, res: any) => {
        passport.authenticate('github', { failureRedirect: '/login' },
            function (req: any, res: any) {
                // Successful authentication, redirect home.
                res.redirect('/');
            })
    },
}