import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

export default function ModalHeadlessButton({ name, operation, style }) {
    let [isOpen, setIsOpen] = useState(false);
    const query = useSelector(selectQuery);
    const dispatch = useDispatch();
    const [isFilter, setIsFilter] = React.useState('');

    const modalRef = React.useRef(null);

    const getCurrentChecked = (operation, name) => {
        if (operation == 'creators') {
            if (query.creatorsIn.some((i) => i === name)) {
                setIsFilter('filterWith');
            } else if (query.categoriesNin.some((i) => i === name)) {
                setIsFilter('filterWithout');
            } else {
                setIsFilter('');
            }
        } else if (operation == 'categories') {
            if (query.categoriesIn.some((i) => i === name)) {
                setIsFilter('filterWith');
            } else if (query.categoriesNin.some((i) => i === name)) {
                setIsFilter('filterWithout');
            } else {
                setIsFilter('');
            }
        } else {
            throw new Error('Error unable to get the current filter checked');
        }
    };

    const isAFilter = (name) => {
        const allFilters = [
            ...query.creatorsIn,
            ...query.creatorsNin,
            ...query.categoriesIn,
            ...query.categoriesNin
        ];
        if (allFilters.some((i) => i === name)) {
            return true;
        }
        return false;
    };

    // search through all arrays and remove
    const unCheckFilter = (name, operation) => {
        if (operation == 'creators') {
            if (query.creatorsIn.some((i) => i === name)) {
                dispatch(removeFromCreatorsIn(name));
            } else {
                dispatch(removeFromCreatorsNin(name));
            }
        } else if (operation == 'categories') {
            if (query.categoriesIn.some((i) => i === name)) {
                dispatch(removeFromCategoriesIn(name));
            } else {
                dispatch(removeFromCategoriesNin(name));
            }
        } else {
            throw new Error(`Unable to uncheck the filter ${name}`);
        }
    };

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
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className="inline-block group">
            <button
                className={`${style} ${isAFilter(name) ? 'border-gray-800' : ''}`}
                onClick={() => {
                    getCurrentChecked(operation, name);
                    openModal();
                }}>
                <span className="flex-1  font-semibold pb-0.2">{name}</span>
            </button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    initialFocus={modalRef}
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
                            <div className="inline-block w-full max-w-md text-left align-top transition-all transform bg-gray-500 shadow-xl mt-52 rounded-xl">
                                <Dialog.Title className="my-2 text-2xl text-center text-white">
                                    {name}
                                </Dialog.Title>

                                <div className="relative flex flex-col w-full bg-gray-700 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                    <Dialog.Description>
                                        {' '}
                                        <button
                                            className="w-full p-3 border-b border-gray-500 last:border-b-0"
                                            onClick={() => {
                                                !isFilter ? '' : unCheckFilter(name, operation);
                                                setIsOpen(false);
                                            }}>
                                            <input
                                                id="radio1"
                                                type="radio"
                                                name="radio"
                                                className="hidden"
                                                defaultChecked={!isFilter ? true : false}
                                            />

                                            <label
                                                ref={modalRef}
                                                htmlFor="radio1"
                                                className="flex items-center justify-between text-xl text-gray-400 transition cursor-pointer select-none hover:text-gray-300 ">
                                                {!isFilter
                                                    ? 'Halda óbreyttu'
                                                    : 'Afvelja leitarskilyrði'}
                                                <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full flex-no-shrink"></span>
                                            </label>
                                        </button>
                                        <button
                                            className="w-full p-3 border-b border-gray-500 last:border-b-0 "
                                            onChange={() => {
                                                addFilter(name, operation, 'In');
                                                setIsOpen(false);
                                            }}>
                                            <input
                                                id="radio2"
                                                type="radio"
                                                name="radio"
                                                className="hidden"
                                                defaultChecked={
                                                    isFilter == 'filterWith' ? true : false
                                                }
                                            />
                                            <label
                                                htmlFor="radio2"
                                                className="flex items-center justify-between text-xl text-gray-400 transition cursor-pointer select-none hover:text-gray-300">
                                                Niðurstöður með
                                                <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full shadow-inner flex-no-shrink"></span>
                                            </label>
                                        </button>
                                        <button
                                            className="w-full p-3 border-b border-gray-500 last:border-b-0"
                                            onChange={() => {
                                                addFilter(name, operation, 'Nin');
                                                setIsOpen(false);
                                            }}>
                                            <input
                                                id="radio3"
                                                type="radio"
                                                name="radio"
                                                className="hidden"
                                                defaultChecked={
                                                    isFilter == 'filterWithout' ? true : false
                                                }
                                            />
                                            <label
                                                htmlFor="radio3"
                                                className="flex items-center justify-between text-xl text-gray-400 transition cursor-pointer select-none hover:text-gray-300">
                                                Niðurstöður án
                                                <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full flex-no-shrink"></span>
                                            </label>
                                        </button>
                                    </Dialog.Description>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
