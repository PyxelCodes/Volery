export default {
    methods: ['GET'],
    get: async (req: Express.Request, res: any) => {
        if (req.user) {
            res.send(req.user)
        } else {
            res.status(401).send({ msg: 'Unauthorized' })
        }
    }
}