'use client';
import { useRouter } from 'next/router';
import { store } from './store';
import { Provider } from 'react-redux';

type Props = {
    children: React.ReactNode;
};

declare global {
    var Router: ReturnType<typeof useRouter>;
}

export default function ReduxProvider({ children }: Props) {
    return <Provider store={store}>{children}</Provider>;
}
