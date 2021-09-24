import { Router } from 'express';
import User from '../../schemas/user';
const router = Router();

router.get('/me', async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    //@ts-ignore
    let user = await User.findOne({ id: req.user.id });

    if (!user) return res.sendStatus(404);

    res.json(user)
})

export default router;