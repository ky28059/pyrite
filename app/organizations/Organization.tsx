'use client'

import { useContext, useState } from 'react';
import UserDataContext from '@/contexts/UserDataContext';
import DOMPurify from 'isomorphic-dompurify';

// Components
import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';
import OutlineButton, { DangerOutlineButton } from '@/components/OutlineButton';
import OrganizationProfilePicture from '@/app/organizations/OrganizationProfilePicture';

// Utils
import type { BoilerLinkOrganizationData } from '@/util/boilerlink';


export default function Organization(props: BoilerLinkOrganizationData) {
    const [open, setOpen] = useState(false);
    const { data, setData } = useContext(UserDataContext);

    function addToPinned() {
        const newData = { ...data };
        newData.pinnedOrgIds = [...newData.pinnedOrgIds, props.Id];
        setData(newData);
        setOpen(false);
    }

    function removeFromPinned() {
        const newData = { ...data };
        newData.pinnedOrgIds = newData.pinnedOrgIds.filter((i) => i !== props.Id);
        setData(newData);
        setOpen(false);
    }

    return (
        <>
            <button
                className="flex gap-5 text-left"
                onClick={() => setOpen(true)}
            >
                <OrganizationProfilePicture {...props} />

                <div className="min-w-0">
                    <h5 className="font-semibold">{props.Name}</h5>
                    <p className="text-sm text-secondary line-clamp-2">
                        {props.Summary}
                    </p>
                </div>
            </button>

            <CenteredModal
                isOpen={open}
                setIsOpen={setOpen}
                className="relative flex flex-col bg-content rounded-md w-[48rem] max-h-[90%] mx-2 py-6 px-8 sm:px-10 shadow-xl"
            >
                <CloseButton
                    className="absolute right-6 top-5"
                    onClick={() => setOpen(false)}
                />

                <h1 className="flex gap-4 items-center font-bold text-2xl text-pretty mb-3 pr-8">
                    <OrganizationProfilePicture {...props} />
                    {props.Name}
                </h1>

                {props.CategoryNames.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-xs font-semibold mb-1.5">
                        {props.CategoryNames.map((c) => (
                            <p className="rounded-full bg-theme/30 text-theme px-2 py-1 flex-none" key={c}>
                                {c}
                            </p>
                        ))}
                    </div>
                )}

                {/*<p className="flex gap-2 items-center text-sm text-secondary">*/}
                {/*    <BsPeopleFill /> {props.instructors.join(', ')}*/}
                {/*</p>*/}
                {/*<p className="flex gap-2 items-center text-sm text-secondary">*/}
                {/*    <FaLocationDot /> {props.location}*/}
                {/*</p>*/}
                {/*<p className="flex gap-2 items-center text-sm text-secondary">*/}
                {/*    <FaCalendar /> {props.dayOfWeek} {props.start}-{props.end}*/}
                {/*</p>*/}

                <div
                    className="text-sm space-y-2 mt-4 break-all overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.Description || props.Summary || '') }}
                />

                {!data.pinnedOrgIds.includes(props.Id) ? (
                    <OutlineButton className="mt-4 w-max" onClick={addToPinned}>
                        Add to pinned
                    </OutlineButton>
                ) : (
                    <DangerOutlineButton className="mt-4 w-max" onClick={removeFromPinned}>
                        Remove from pinned
                    </DangerOutlineButton>
                )}
            </CenteredModal>
        </>
    )
}
