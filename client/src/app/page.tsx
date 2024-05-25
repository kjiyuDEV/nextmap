'use client';
import Image from 'next/image';
import './_component/asset/css/customCSS/login.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    interface FormState {
        userId: string | null;
        password: string | null;
        name: string | null;
    }

    const [form, setForm] = useState<FormState>({
        userId: '',
        password: '',
        name: '',
    });
    const [state, setState] = useState('signIn');

    const handleSignIn = () => {
        const { userId, password } = form;
        if (userId && password) {
            axios
                .post(`http://localhost:7000/auth`, { userId, password })
                .then((res) => {
                    console.log(res.data);
                    router.push('/map');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.msg);
                });
        } else {
            toast.error('아이디 및 비밀번호를 입력해주세요');
        }
    };

    const handleSignUp = () => {
        console.log('test');
        const { userId, password, name } = form;
        if (userId && password) {
            axios
                .post(`http://localhost:7000/user/register`, { userId, password, name })
                .then((res) => {
                    console.log(res.data);
                    toast.success(`회원가입이 완료되었습니다`);
                    setState('signIn');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.msg);
                });
        } else {
            toast.error('회원가입에 실패했어요');
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state === 'signIn') handleSignIn();
        if (state === 'signUp') handleSignUp();
    };

    console.log(state);

    const signInForm = () => {
        return (
            <>
                <div className="field">
                    <input
                        placeholder="아이디"
                        className="input-field"
                        type="text"
                        onChange={(e) => {
                            setForm({ ...form, userId: e.target.value });
                        }}
                        value={form.userId}
                    />
                </div>
                <div className="field">
                    <input
                        placeholder="비밀번호"
                        className="input-field"
                        type="password"
                        onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                        }}
                    />
                </div>
                <div className="btn">
                    <button className="button1" onClick={() => setState('signIn')}>
                        로그인
                    </button>
                    <button className="button1" onClick={() => setState('signUp')}>
                        회원가입
                    </button>
                </div>
            </>
        );
    };

    useEffect(() => {
        setForm({
            userId: '',
            password: '',
            name: '',
        });
    }, [state]);

    const signUpForm = () => {
        return (
            <>
                <div className="field">
                    <input
                        placeholder="이름(닉네임)"
                        className="input-field"
                        type="text"
                        onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                        }}
                        value={form.name}
                    />
                </div>
                <div className="field">
                    <input
                        placeholder="아이디"
                        className="input-field"
                        type="text"
                        onChange={(e) => {
                            setForm({ ...form, userId: e.target.value });
                        }}
                    />
                </div>
                <div className="field">
                    <input
                        placeholder="비밀번호"
                        className="input-field"
                        type="password"
                        onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                        }}
                    />
                </div>
                <div className="btn">
                    <button className="button2" onClick={() => setState('signIn')}>
                        뒤로가기
                    </button>
                    <button className="button1" onClick={() => setState('signUp')}>
                        회원가입
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="main-wrap">
                <form className="form" onSubmit={handleFormSubmit}>
                    <p id="heading">Custom-Our-Map</p>
                    {state === 'signIn' && signInForm()}
                    {state === 'signUp' && signUpForm()}
                </form>
            </div>
        </>
    );
}
