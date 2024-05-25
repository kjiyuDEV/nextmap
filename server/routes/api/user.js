import express from 'express';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import config from '../../config/index';
const { JWT_SECRET } = config;

// Model
import User from '../../models/user';

const router = express.Router();

// @routes     GET api/user
// @desc       Get all user
// @access     public

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (!users) throw Error('존재하지 않는 유저입니다');
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// @routes     POST api/user
// @desc       Register  user
// @access     public

router.post('/register', (req, res) => {
    console.log(req);
    const { name, userId, password } = req.body;

    // Simple validation
    if (!name || !userId || !password) {
        return res.status(400).json({ msg: '모든 필드를 채워주세요' });
    }
    // Check for existing user
    User.findOne({ userId }).then((user) => {
        // unique key로 체크함
        if (user)
            return res.status(400).json({
                msg: '이미 가입된 유저가 존재합니다',
            });
        const newUser = new User({
            name,
            userId,
            password,
        });

        //해시값을 쉽게바꿔준다.
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                userId: user.userId,
                            },
                        });
                    });
                });
            });
        });
    });
});

export default router;
