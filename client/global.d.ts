import { NextRouter } from 'next/router';

declare global {
    var Router: NextRouter;
    interface Window {
        initMap: (() => void) | null;
    }
}
