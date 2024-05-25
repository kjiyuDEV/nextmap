// 레이아웃 파일에서 폰트 및 메타데이터 정보를 설정 할 수 있다.
// react의 index.html을 생각해보면 되겠다.
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReduxProvider from './redux/provider';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import './_component/asset/css/reset.scss';
import './_component/asset/css/common.scss';
import Toast from './_component/common/Toast';
import Modal from './_component/common/Modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'NEXT-GOOGLE-MAP',
    description: 'NextJS & expressJS로 제작된 장소 저장 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <ReduxProvider>
                    <Toast />
                    <Modal />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
