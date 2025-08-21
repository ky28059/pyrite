'use client'

import { useState, useEffect, useLayoutEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FiPlusSquare, FiShare } from 'react-icons/fi';


// Ported from https://github.com/GunnWATT/watt/blob/main/client/src/components/layout/InstallModal.tsx
export default function InstallModal() {
    // TODO: ideally we customize our installation flow, but browser support is quite poor for that
    // Leaving this here as a "maybe in the future when support improves": https://web.dev/customize-install/
    /*
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent>(null);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setPrompt(e);
        });
    }, [])
    */

    // Display the modal if the user is on iOS and not running in standalone mode
    const [isOpen, setIsOpen] = useState(false);
    useLayoutEffect(() => {
        // @ts-ignore
        setIsOpen((/iPad|iPod|iPhone/).test(navigator.userAgent) && !navigator.standalone);
    }, []);

    return (
        <Dialog
            className="fixed z-50 inset-0 flex flex-col items-center justify-end"
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/40 transition duration-300 data-[closed]:duration-200 ease-out data-[closed]:ease-in data-[closed]:opacity-0"
            />

            <DialogPanel
                transition
                className="relative flex flex-col bg-content rounded-t-2xl max-w-md max-h-[80%] mx-3 pt-6 px-6 shadow-xl transition duration-300 data-[closed]:duration-200 ease-out data-[closed]:ease-in data-[closed]:translate-y-12 data-[closed]:opacity-0"
            >
                <img
                    src="/icons/maskable-512x512.png"
                    alt="Home screen icon"
                    className="absolute rounded-3xl h-24 w-24 -top-10 left-0 right-0 mx-auto"
                />
                <h3 className="text-lg font-semibold mt-9">
                    It looks like you're using Pyrite in the iOS Safari app.
                </h3>
                <hr className="my-3 border-tertiary" />

                <section className="overflow-scroll scroll-smooth scrollbar-none pb-6">
                    <p className="mb-3">Pyrite is best experienced when installed as a PWA.</p>
                    <p className="mb-3">To add Pyrite to your home screen,</p>
                    <ol className="list-decimal list-inside space-y-1 mb-3">
                        <li>Tap the share button <FiShare className="inline h-6 w-6 p-1 bg-content-secondary rounded-md" />.</li>
                        <li>Select <strong>"Add to Home Screen"</strong> in the bottom row.</li>
                        <div className="p-2 bg-content-secondary rounded-lg">
                            <span className="flex items-center justify-between text-sm font-light p-3 bg-content rounded-lg">
                                Add to Home Screen
                                <FiPlusSquare className="h-[1.1rem] w-[1.1rem]" />
                            </span>
                        </div>
                        <li>In the dialogue, tap <strong>"Add"</strong>.</li>
                    </ol>

                    <p className="text-secondary text-sm">
                        Not interested?{' '}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="font-semibold focus:outline-none focus:underline"
                        >
                            Dismiss.
                        </button>
                    </p>
                </section>
            </DialogPanel>
        </Dialog>
    )
}
