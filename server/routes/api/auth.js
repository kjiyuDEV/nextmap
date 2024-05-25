import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index';
const { JWT_SECRET } = config;

// Model
import User from '../../models/user';

const router = express.Router();

// @route    POST  api/auth
// @desc     Auth  user
// @access   Public
// 로그인
router.post('/', (req, res) => {
    const { userId, password } = req.body;

    // Simple Validation
    if (!userId || !password) {
        return res.status(400).json({
            msg: '아이디와 비밀번호를 모두 입력해주세요',
        });
    }
    // Check for existing user
    User.findOne({ userId }).then((user) => {
        if (!user) return res.status(400).json({ msg: '아이디가 존재하지 않아요' });

        // Validate password
        // 해시값을 바꿔줌
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).json({
                    msg: '비밀번호가 일치하지 않아요',
                });
            jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2 days' }, (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        userId: user.userId,
                        role: user.role,
                        nickname: user.nickname,
                    },
                });
            });
        });
    });
});

// 로그아웃
router.post('/logout', (req, res) => {
    res.json('로그아웃 성공');
});

// 유저찾기
// router.get('/user', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) throw Error('유저가 존재하지 않습니다');
//         res.json(user);
//     } catch (e) {
//         console.log(e);
//         res.status(400).json({ msg: e.message });
//     }
// });

export default router;
