import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SelectSearch, { fuzzySearch } from 'react-select-search/dist/cjs';
import React from 'react';

export default function ModalHeadless({ data, open }) {
    let [isOpen, setIsOpen] = useState(true);

    React.useEffect(() => {
        if (open) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [open]);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div className="inline-block w-full max-w-md p-6 mt-20 text-left align-top transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title className="text-lg text-white">Flokkar</Dialog.Title>

                            {/* <Dialog.Description> */}
                            <SelectSearch
                                options={data.creatorsList}
                                // renderValue={renderFontValue}
                                // renderOption={renderFontOption}
                                printOptions="always"
                                search
                                filterOptions={fuzzySearch}
                                placeholder="Search friends"
                            />
                            {/* </Dialog.Description> */}
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-500 bg-gray-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 "
                                onClick={() => setIsOpen(false)}>
                                Loka
                            </button>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
