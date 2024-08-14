'use client'

import { useContext, useEffect, useRef } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';

// Utils
import type { Period } from '@/util/schedule';
import { useNextPeriod } from '@/hooks/useNextPeriod';
import { hexToRgb } from '@/util/color';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


const config = resolveConfig(tailwindConfig);

// Ported mostly from https://github.com/GunnWATT/watt/blob/main/client/src/components/schedule/FaviconHandler.tsx
export default function FaviconHandler() {
    const { data } = useContext(UserDataContext);

    // TODO: use timeouts
    const date = useContext(CurrentTimeContext);
    const { next, toStart, toEnd, span } = useNextPeriod();

    // Reference to the favicon element
    const favicon = useRef<HTMLLinkElement>();
    const canvas = useRef<HTMLCanvasElement>();

    const FAVICON_SIZE = 32;
    const borderRadius = FAVICON_SIZE * 0.15;
    const sRadius = FAVICON_SIZE * 0.45; // radius for last seconds

    // Update document name and favicon based on current period
    useEffect(() => {
        // Initialize canvas reference
        if (!canvas.current) {
            canvas.current = document.createElement('canvas');
            canvas.current.width = FAVICON_SIZE;
            canvas.current.height = FAVICON_SIZE;
        }

        // If there's no period to display, set favicon and tab title back to defaults
        if (!next || toStart > span) {
            const titleElement = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
            document.title = titleElement.content;

            if (favicon.current) {
                favicon.current.href = '/icon.svg';
                favicon.current.type = 'image/svg+xml';
            }
            return;
        }

        // Initialize favicon <link> element only if there is a non-default favicon to display
        if (!favicon.current) {
            favicon.current = document.querySelector('link[rel="icon"]')! as HTMLLinkElement;
        }

        document.title = ((toStart > 0)
            ? `${next.name} starting in ${Math.ceil(toStart)} minute${Math.ceil(toStart) !== 1 ? 's' : ''}.`
            : `${next.name} ending in ${Math.ceil(toEnd)} minute${Math.ceil(toEnd) !== 1 ? 's' : ''}, started ${Math.ceil(-toStart)} minute${Math.ceil(-toStart) !== 1 ? 's' : ''} ago.`)
            + ' (Pyrite)'

        let numToShow = toStart >= 0 ? Math.ceil(toStart) : Math.ceil(toEnd);
        const isSeconds = numToShow === 1;
        if (isSeconds) numToShow = toStart >= 0 ? Math.ceil(toStart * 60) : Math.ceil(toEnd * 60);

        const color = periodTypeToColor(next.type);
        const fc = canvas.current.getContext('2d')!;

        // configure it to look nice
        fc.textAlign = 'center';
        fc.textBaseline = 'middle';
        fc.lineWidth = FAVICON_SIZE * 0.1;
        fc.lineJoin = 'round';
        fc.lineCap = 'round';

        // https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
        function isLight(color: string) {
            const [r, g, b] = hexToRgb(color)!;
            return Math.round((r * 299 + g * 587 + b * 114) / 1000) > 150;
        }

        fc.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);

        if (isSeconds) {
            fc.fillStyle = color;
            fc.strokeStyle = color;
            fc.beginPath();
            fc.moveTo(FAVICON_SIZE / 2 + sRadius, FAVICON_SIZE / 2);
            fc.arc(FAVICON_SIZE / 2, FAVICON_SIZE / 2, sRadius, 0, 2 * Math.PI);
            fc.closePath();
            fc.fill();

            fc.beginPath();
            fc.moveTo(FAVICON_SIZE / 2, FAVICON_SIZE / 2 - sRadius);

            // Rounding seconds so when it shows 30 seconds always will show half-way,
            // even if it's not exactly 30s
            fc.arc(
                FAVICON_SIZE / 2,
                FAVICON_SIZE / 2,
                sRadius,
                Math.PI * 1.5,
                2 * Math.PI * (1 - Math.round(numToShow) / 60) - Math.PI / 2,
                true
            )
            fc.stroke()

            fc.fillStyle = isLight(color) ? 'black' : 'white';
            fc.font = `bold ${FAVICON_SIZE * 0.6}px "Roboto", sans-serif`
            fc.fillText(
                Math.round(numToShow)
                    .toString()
                    .padStart(2, '0'),
                FAVICON_SIZE / 2,
                FAVICON_SIZE * 0.575
            )
        } else {
            fc.fillStyle = color || 'info'
            fc.beginPath()

            // Rounded square
            fc.moveTo(0, borderRadius)
            fc.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5)
            fc.lineTo(FAVICON_SIZE - borderRadius, 0)
            fc.arc(
                FAVICON_SIZE - borderRadius,
                borderRadius,
                borderRadius,
                -Math.PI / 2,
                0
            )
            fc.lineTo(FAVICON_SIZE, FAVICON_SIZE - borderRadius)
            fc.arc(
                FAVICON_SIZE - borderRadius,
                FAVICON_SIZE - borderRadius,
                borderRadius,
                0,
                Math.PI / 2
            )
            fc.lineTo(borderRadius, FAVICON_SIZE)
            fc.arc(
                borderRadius,
                FAVICON_SIZE - borderRadius,
                borderRadius,
                Math.PI / 2,
                Math.PI
            )
            fc.closePath()
            fc.fill()

            fc.fillStyle = isLight(color) ? 'black' : 'white';
            fc.font = `bold ${numToShow > 100 ? FAVICON_SIZE * 0.6 : FAVICON_SIZE * 0.8}px "Roboto", sans-serif`
            fc.fillText('' + numToShow, FAVICON_SIZE / 2, FAVICON_SIZE * 0.575)
        }

        favicon.current.href = canvas.current.toDataURL();
        favicon.current.type = 'image/png';
    }, [date])

    return null;
}

function periodTypeToColor(type: Period['type']) {
    switch (type) {
        case 'Lecture':
        case 'Lecture (Hybrid)':
            return '#f1b42f'
        case 'Laboratory':
        case 'Laboratory (Hybrid)':
            // @ts-ignore TODO
            return config.theme.colors.laboratory;
        case 'Pso':
            // @ts-ignore TODO
            return config.theme.colors.pso;
        case 'Recitation':
        case 'Recitation (Hybrid)':
            // @ts-ignore TODO
            return config.theme.colors.recitation;
        case 'Event':
            // @ts-ignore TODO
            return config.theme.colors.event;
        case 'Midterm':
            // @ts-ignore TODO
            return config.theme.colors.midterm;
        default: // TODO: travel time?
            return '#f1b42f'
    }
}
