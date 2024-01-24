import {MouseEventHandler, ReactNode} from 'react';


// A general purpose outline button for use primarily in modals.
// https://github.com/GunnWATT/watt/blob/main/client/src/components/layout/OutlineButton.tsx
type OutlineButtonProps = {
    className?: string,
    children: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
};
export default function OutlineButton(props: OutlineButtonProps) {
    const {children, className, ...buttonProps} = props;

    return (
        <button
            className={'text-secondary dark:text-secondary-dark border border-secondary dark:border-secondary-dark hover:!text-white hover:bg-[#9c9ca2] dark:hover:bg-[#717173] hover:shadow-lg hover:shadow-gray-500/40 dark:hover:shadow-zinc-800/40 hover:!border-transparent rounded px-3 py-2 transition-shadow duration-100 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-black/20 dark:focus-visible:ring-white/20' + (className ? ` ${className}` : '')}
            {...buttonProps}
        >
            {children}
        </button>
    )
}

export function DangerOutlineButton(props: OutlineButtonProps) {
    const {children, className, ...buttonProps} = props;

    return (
        <button
            className={'text-red-500 border border-red-500 hover:text-white hover:bg-gradient-to-br hover:from-red-500 hover:to-red-700 dark:hover:to-[#eb144c] hover:shadow-lg hover:shadow-red-700/40 hover:border-transparent px-3 py-2 rounded transition-shadow duration-100 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-red-500/25' + (className ? ` ${className}` : '')}
            {...buttonProps}
        >
            {children}
        </button>
    )
}
