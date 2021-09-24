import GitHub from 'passport-github';
import passport from 'passport'
import User from '../schemas/authUser'
import dbUser from '../schemas/user'
import { AES } from 'crypto-js'
import config from '../config';

passport.serializeUser(async (user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findOne({ id });
        return user ? done(null, user) : done(null, null)
    } catch (error) {
        console.log(error);
        done(error, null)
    }
})

passport.use(new GitHub.Strategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL,
},
    async function (accessToken, refreshToken, profile, done) {
        // refreshtoken is always undefined, no need interacting with it

        let enc = AES.encrypt(accessToken, 'h');
        let { id, displayName, username } = profile
        let avatar = `https://avatars.githubusercontent.com/u/${id}?v=4`

        try {
            let user = await User.findOne({ id })

            if (!user) {
                let u = await User.create({
                    id,
                    displayName,
                    username,
                    avatar,
                    accessToken: enc,
                })

                await dbUser.create({
                    id,
                    friends: [],
                    bio: '',
                    status: null,
                    displayName,
                    badges: [],
                    created: Date.now(),
                    avatar,
                    username,
                    communities: [],
                    userSettings: {}
                })


                done(null, u)

            } else {
                done(null, user)
            }


        } catch (error) {
            console.log(error)
            return done(error, undefined)
        }
    }
));