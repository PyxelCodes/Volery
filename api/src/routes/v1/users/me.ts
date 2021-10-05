import User from '../../../schemas/user';

export default {
    methods: ['GET'],
    get: async (req: Express.Request, res: any) => {
        if (!req.user) return res.sendStatus(401);

        //@ts-ignore
        let user = await User.findOne({ id: req.user.id });

        if (!user) return res.sendStatus(404);

        res.json(user)
    }
}