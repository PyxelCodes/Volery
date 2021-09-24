import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
router.get('/', (req, res) => {
    console.log(req.user)
    if (req.user) {
        res.send(req.user)
    } else {
        res.status(401).send({ msg: 'Unauthorized' })
    }
})

export default router;