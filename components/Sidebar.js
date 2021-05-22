import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetQuery, selectQuery } from '../store/slices/querySlice';
import ModalButton from './ModalButton';
import ModalSearch from './ModalSearch';

export default function Sidebar({ data }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const query = useSelector(selectQuery);

    const ShowTypesOfFilters = (operation) => {
        if (operation == 'creatorsIn' || operation == 'categoriesIn') {
            return <div className="text-xs font-black text-gray-800">Inniheldur</div>;
        }
        if (operation == 'creatorsNin' || operation == 'categoriesNin') {
            return <div className="text-xs font-black text-gray-800">Inniheldur ekki</div>;
        }
    };

    const RenderCategoryItemInModal = ({ array, operation }) => {
        return (
            <>
                {ShowTypesOfFilters(operation)}
                <div className="flex flex-wrap">
                    {array.map((element, index) => {
                        return (
                            <div key={index} className="text-gray-200">
                                {element ? (
                                    <span className="m-1 overflow-hidden text-lg text-gray-200 overflow-ellipsis whitespace-nowrap">
                                        <ModalButton
                                            name={element}
                                            operation="creators"
                                            style={`flex px-1 my-1 text-base  font-medium text-gray-300 bg-gray-700 border border-gray-500 border-solid rounded-sm hover:text-white  outline-none hover:bg-gray-600 focus:outline-none select-none ${
                                                operation == 'creatorsIn' ||
                                                operation == 'categoriesIn'
                                                    ? 'last:mb-3'
                                                    : ''
                                            }`}
                                        />
                                    </span>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    function areFilters() {
        const allFilters = [
            ...query.creatorsIn,
            ...query.creatorsNin,
            ...query.categoriesIn,
            ...query.categoriesNin
        ];
        if (allFilters.length > 0) {
            return true;
        }
        return false;
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 overflow-hidden"
                    open={open}
                    onClose={() => setOpen(false)}>
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-900 bg-opacity-75" />
                        </Transition.Child>
                        <div className="fixed inset-y-0 right-0 flex max-w-3/4 ">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full">
                                <div className="relative w-screen max-w-md">
                                    <div className="flex flex-col h-full py-6 overflow-y-scroll bg-gray-700 shadow-xl">
                                        {/* BREAK: Start of content */}
                                        <div className="flex flex-col w-full p-3 pt-10 h-4/5">
                                            <div className="relative w-full mb-2 bg-gray-500 rounded h-1/2 scrollbar-thumb-gray-600">
                                                <div className="h-full pb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md rtl-grid">
                                                    <>
                                                        <ModalSearch
                                                            title="VEFSIÐUR"
                                                            searchType="creators"
                                                            data={data.creatorsList}
                                                        />

                                                        <div className="absolute top-0 right-0">
                                                            <div className="p-2 text-4xl font-black leading-none text-gray-300 bg-gray-700 select-none rounded-bl-md ">
                                                                VEFSIÐUR
                                                            </div>
                                                        </div>
                                                    </>
                                                    <div className="ml-3 ltr-grid mt-14">
                                                        {query.creatorsIn.length > 0 ? (
                                                            <RenderCategoryItemInModal
                                                                array={query.creatorsIn}
                                                                operation={'creatorsIn'}
                                                            />
                                                        ) : null}
                                                        {query.creatorsNin.length > 0 ? (
                                                            <RenderCategoryItemInModal
                                                                array={query.creatorsNin}
                                                                operation={'creatorsNin'}
                                                            />
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative w-full mt-2 bg-gray-500 rounded h-1/2 scrollbar-thumb-gray-600">
                                                <div className="h-full pb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md rtl-grid">
                                                    <>
                                                        <ModalSearch
                                                            title="FLOKKAR"
                                                            searchType="categories"
                                                            data={data.categoriesList}
                                                        />
                                                        <div className="absolute top-0 right-0">
                                                            <div className="p-2 text-4xl font-black leading-none text-gray-300 bg-gray-700 select-none rounded-bl-md ">
                                                                FLOKKAR
                                                            </div>
                                                        </div>
                                                    </>
                                                    <div className="ml-3 ltr-grid mt-14 ">
                                                        {query.categoriesIn.length > 0 ? (
                                                            <RenderCategoryItemInModal
                                                                array={query.categoriesIn}
                                                                operation={'categoriesIn'}
                                                            />
                                                        ) : null}
                                                        {query.categoriesNin.length > 0 ? (
                                                            <RenderCategoryItemInModal
                                                                array={query.categoriesNin}
                                                                operation={'categoriesNin'}
                                                            />
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* BREAK: End of content */}
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="fixed z-40 bottom-5 right-4 ">
                <Transition
                    as={Fragment}
                    show={areFilters()}
                    enter="transition ease-out duration-300 "
                    enterFrom="transform opacity-0 scale-0"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-out duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform  opacity-0 scale-50">
                    <button
                        className="w-16 h-16 mr-20 align-bottom outline-none select-none focus:outline-none"
                        onClick={() => dispatch(resetQuery())}>
                        <span
                            className={`z-20 flex items-center  focus:outline-none justify-center w-16 h-16 duration-300 ease-out transition-colors  rounded-full ${
                                open ? 'bg-black' : 'bg-gray-500'
                            }`}>
                            <source src="/remove-filters.svg" type="image/svg+xml" />
                            <img
                                className="pt-2.5 h-12"
                                alt="remove-filters"
                                src="/remove-filters.svg"
                            />
                        </span>
                    </button>
                </Transition>

                <button
                    className="w-16 h-16 mr-2 rounded-full select-none focus:outline-none"
                    aria-label="Open Menu"
                    onMouseDown={() => setOpen(!open)}>
                    <div
                        id="box"
                        className={` w-16 h-16 z-30 rounded-full duration-500 ease-out transition-colors tham tham-e-squeeze tham-w-8 
                            ${open ? 'bg-black tham-active' : 'bg-gray-500'}
                        `}>
                        <div className="z-40 tham-box">
                            <div className="z-30 bg-white tham-inner" />
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
}
