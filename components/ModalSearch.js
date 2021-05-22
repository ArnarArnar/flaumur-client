import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectSearch, { fuzzySearch } from 'react-select-search/dist/cjs';

import {
    addToCategoriesIn,
    addToCategoriesNin,
    addToCreatorsIn,
    addToCreatorsNin,
    removeFromCategoriesIn,
    removeFromCategoriesNin,
    removeFromCreatorsIn,
    removeFromCreatorsNin,
    selectQuery
} from '../store/slices/querySlice';

export default function ModalSearch({ data, title }) {
    console.log(`data`, data);
    let [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = React.useState('');
    const [creator, setCreator] = React.useState('');

    const dispatch = useDispatch();
    const query = useSelector(selectQuery);

    const addFilter = (name, operation, addOrRemove) => {
        checkIfAlreadyInReverse(name, operation, addOrRemove);
        if (operation == 'creators') {
            if (addOrRemove == 'In') {
                dispatch(addToCreatorsIn(name));
            } else {
                dispatch(addToCreatorsNin(name));
            }
        }
        if (operation == 'categories') {
            if (addOrRemove == 'In') {
                dispatch(addToCategoriesIn(name));
            } else {
                dispatch(addToCategoriesNin(name));
            }
        }
    };

    const checkIfAlreadyInReverse = (name, operation, addOrRemove) => {
        let reverse = addOrRemove == 'In' ? 'Nin' : 'In';
        reverse = operation.toString() + reverse.toString();
        if (operation == 'creators') {
            if (query[reverse] && query[reverse].find((item) => item == name)) {
                if (addOrRemove == 'In') {
                    dispatch(removeFromCreatorsNin(name));
                } else {
                    dispatch(removeFromCreatorsIn(name));
                }
                return;
            }
        }
        if (operation == 'categories') {
            if (query[reverse] && query[reverse].find((item) => item == name)) {
                if (addOrRemove == 'In') {
                    dispatch(removeFromCategoriesNin(name));
                } else {
                    dispatch(removeFromCategoriesIn(name));
                }
                return;
            }
        }
    };

    function closeModal() {
        setCreator('');
        setCategory('');
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div>
            <button
                className="absolute left-0 flex flex-row-reverse w-full p-3 text-lg text-gray-200 bg-gray-500 rounded-md rounded-tl-md hover:text-white hover:bg-gray-400"
                onClick={() => {
                    openModal(true);
                }}>
                <div className="self-center pl-1 pr-2">
                    <source src="/search.svg" type="image/svg+xml" />
                    <img className="h-6 " alt="search" src="/search.svg" />
                </div>
                <div>Leita</div>
            </button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}>
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
                            <div className="inline-block w-full max-w-md mt-20 text-left align-top transition-all transform bg-gray-500 shadow-xl rounded-xl ">
                                <Dialog.Title className="my-2 text-2xl text-center text-white">
                                    {title}
                                </Dialog.Title>

                                <div className="flex flex-wrap h-32 p-6 px-12 bg-gray-700 rounded-lg ">
                                    <Transition
                                        as={Fragment}
                                        show={!!creator}
                                        enter="transition ease-out duration-75 "
                                        enterFrom="transform opacity-0 scale-0"
                                        enterTo="transform opacity-100 scale-100">
                                        <div className="flex justify-between w-full mb-4">
                                            <>
                                                <button
                                                    onClick={() => {
                                                        addFilter(creator, 'creators', 'In');
                                                        setCreator('');
                                                        closeModal();
                                                    }}
                                                    className="flex px-1 font-medium text-green-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                                    Niðurstöður með
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        addFilter(creator, 'creators', 'Nin');
                                                        setCreator('');
                                                        closeModal();
                                                    }}
                                                    className="flex px-1 font-medium text-red-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                                    Niðurstöður án
                                                </button>
                                            </>
                                        </div>
                                    </Transition>
                                    <Transition
                                        as={Fragment}
                                        show={!!category}
                                        enter="transition ease-out duration-75 "
                                        enterFrom="transform opacity-0 scale-0"
                                        enterTo="transform opacity-100 scale-100">
                                        <div className="flex justify-between w-full mb-4">
                                            <button
                                                onClick={() => {
                                                    addFilter(category, 'categories', 'In');
                                                    setCategory('');
                                                    closeModal();
                                                }}
                                                className="flex px-1 font-medium text-green-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                                Niðurstöður með
                                            </button>
                                            <button
                                                onClick={() => {
                                                    addFilter(category, 'categories', 'Nin');
                                                    setCategory('');
                                                    closeModal();
                                                }}
                                                className="flex px-1 font-medium text-red-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                                Niðurstöður án
                                            </button>
                                        </div>
                                    </Transition>

                                    {title !== 'FLOKKAR' ? (
                                        <div className="self-end w-full">
                                            <SelectSearch
                                                options={data}
                                                search
                                                printOptions="always"
                                                autoFocus={true}
                                                placeholder="Veldu vefsíðu"
                                                value={creator}
                                                onChange={setCreator}
                                                filterOptions={(options) => {
                                                    const filter = fuzzySearch(options);
                                                    return (q) => filter(q).slice(0, 8);
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="self-end w-full">
                                            <SelectSearch
                                                options={data}
                                                search
                                                printOptions="always"
                                                autoFocus={true}
                                                placeholder="Veldu flokk"
                                                value={category}
                                                onChange={setCategory}
                                                filterOptions={(options) => {
                                                    const filter = fuzzySearch(options);
                                                    return (q) => filter(q).slice(0, 8);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
