import React, { useState, useEffect, useRef } from 'react';

//import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import SelectSearch, { fuzzySearch } from 'react-select-search/dist/cjs';

import {
    addToCreatorsIn,
    removeFromCreatorsIn,
    addToCreatorsNin,
    removeFromCreatorsNin,
    addToCategoriesIn,
    removeFromCategoriesIn,
    addToCategoriesNin,
    removeFromCategoriesNin,
    selectQuery,
    resetQuery
} from '../store/slices/querySlice';

export default function Sidebar({ data }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [creatorsOpen, setCreatorsOpen] = React.useState(false);
    const [categoriesOpen, setCategoriesOpen] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [creator, setCreator] = React.useState('');
    const dispatch = useDispatch();
    const query = useSelector(selectQuery);

    const toggleCreatorsOpen = () => setCreatorsOpen(!creatorsOpen);
    const toggleCategoriesOpen = () => setCategoriesOpen(!categoriesOpen);

    React.useEffect(() => {
        if (creatorsOpen) {
            return;
        }
        return () => {
            let input = document.querySelector('.select-search__input');
            input.focus();
        };
    }, [creatorsOpen]);

    React.useEffect(() => {
        if (categoriesOpen) {
            return;
        }
        return () => {
            let input = document.querySelector('.select-search__input');
            if (input !== null) {
                input.focus();
            }
        };
    }, [categoriesOpen]);

    React.useEffect(() => {
        if (!isOpen) {
            setCreatorsOpen(false);
            setCreator('');
            setCategoriesOpen(false);
            setCategory('');
        }
    }, [isOpen]);

    const drawer = () => setIsOpen(!isOpen);

    React.useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setIsOpen(false);
                setCategoriesOpen(false);
                setCreatorsOpen(false);
            }
        };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, []);

    const ShowTypesOfFilters = (operation) => {
        if (operation == 'creatorsIn' || operation == 'categoriesIn') {
            return <div className="text-xs font-black text-gray-700">Inniheldur</div>;
        }
        if (operation == 'creatorsNin' || operation == 'categoriesNin') {
            return <div className="text-xs font-black text-gray-700">Inniheldur ekki</div>;
        }
    };

    const modifyFilter = (element, operation, action) => {
        switch (operation) {
            case 'creatorsIn':
                if (action === 'uncheck') {
                    dispatch(removeFromCreatorsIn(element));
                } else if (action === 'reverse') {
                    dispatch(removeFromCreatorsIn(element));
                    dispatch(addToCreatorsNin(element));
                }
                break;
            case 'creatorsNin':
                if (action === 'uncheck') {
                    dispatch(removeFromCreatorsNin(element));
                } else if (action === 'reverse') {
                    dispatch(removeFromCreatorsNin(element));
                    dispatch(addToCreatorsIn(element));
                }
                break;
            case 'categoriesIn':
                if (action === 'uncheck') {
                    dispatch(removeFromCategoriesIn(element));
                } else if (action === 'reverse') {
                    dispatch(removeFromCategoriesIn(element));
                    dispatch(addToCategoriesNin(element));
                }
                break;
            case 'categoriesNin':
                if (action === 'uncheck') {
                    dispatch(removeFromCategoriesNin(element));
                } else if (action === 'reverse') {
                    dispatch(removeFromCategoriesNin(element));
                    dispatch(addToCategoriesIn(element));
                }
                break;
            default:
                break;
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

    const RenderCategoryItem = ({ array, operation }) => {
        return (
            <>
                {ShowTypesOfFilters(operation)}
                {array.map((element, index) => {
                    return (
                        <div key={index} className="text-gray-200">
                            {element ? (
                                <span className="flex justify-between">
                                    <span className="overflow-hidden text-lg text-gray-200 overflow-ellipsis whitespace-nowrap">
                                        {element}
                                    </span>
                                    <div className="flex self-end flex-shrink-0">
                                        <button
                                            className="pl-1 pr-1 mr-1 text-sm font-bold leading-5 bg-gray-600 border border-gray-400 rounded select-none hover:bg-gray-700"
                                            onClick={() =>
                                                modifyFilter(element, operation, 'uncheck')
                                            }>
                                            Afvelja
                                        </button>
                                        {operation.split('s')[1] == 'In' ? (
                                            <button
                                                className="pl-1 pr-1 mr-1 text-sm font-bold leading-5 bg-gray-600 border border-gray-400 rounded select-none hover:bg-gray-700"
                                                onClick={() =>
                                                    modifyFilter(element, operation, 'reverse')
                                                }>
                                                Án
                                            </button>
                                        ) : (
                                            <button
                                                className="pl-1 pr-1 mr-1 text-sm font-bold leading-5 bg-gray-600 border border-gray-400 rounded select-none hover:bg-gray-700"
                                                onClick={() =>
                                                    modifyFilter(element, operation, 'reverse')
                                                }>
                                                Með
                                            </button>
                                        )}
                                    </div>
                                </span>
                            ) : null}
                        </div>
                    );
                })}
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
        <nav>
            {isOpen ? (
                <div onClick={drawer} className="fixed inset-0 z-10 transition-opacity">
                    <div
                        onClick={drawer}
                        className="absolute inset-0 bg-black opacity-50"
                        tabIndex="0"></div>
                </div>
            ) : null}

            <div
                className={`transform top-0 right-0 w-64 bg-gray-700 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 translate-x-0 flex flex-col justify-between ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col justify-between h-1/3">
                    <div className="pt-3">
                        <span className="flex items-center justify-end pr-4 mb-3 text-gray-400">
                            <button
                                className="text-4xl font-black select-none hover:text-gray-300"
                                onClick={() => {
                                    toggleCategoriesOpen();
                                    setCreatorsOpen(false);
                                    setCreator('');
                                    setCategory('');
                                }}>
                                FLOKKAR
                            </button>
                        </span>
                        {categoriesOpen ? (
                            <SelectSearch
                                options={data.categoriesList}
                                search
                                className={categoriesOpen ? 'select-search has-focus' : ''}
                                //printOptions="always"
                                printOptions="on-focus"
                                placeholder="Veldu vefsíðu"
                                value={category}
                                onChange={setCategory}
                                filterOptions={fuzzySearch}
                            />
                        ) : null}
                        {category ? (
                            <div className="flex mt-1 mb-4 ml-2 mr-2 justify-evenly">
                                <div
                                    onClick={() => {
                                        addFilter(category, 'categories', 'In');
                                        setCategory('');
                                        setCategoriesOpen(false);
                                    }}
                                    className="flex px-1 mt-2 mr-2 font-medium text-green-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                    Niðurstöður með
                                </div>
                                <div
                                    onClick={() => {
                                        addFilter(category, 'categories', 'Nin');
                                        setCategory('');
                                        setCategoriesOpen(false);
                                    }}
                                    className="flex px-1 mt-2 ml-2 font-medium text-red-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                    Niðurstöður án
                                </div>
                            </div>
                        ) : null}

                        <span className="flex items-center justify-end pr-4 text-gray-400 ">
                            <button
                                className="text-4xl font-black select-none hover:text-gray-300"
                                onClick={() => {
                                    toggleCreatorsOpen();
                                    setCategoriesOpen(false);
                                    setCategory('');
                                    setCreator('');
                                }}>
                                VEFSÍÐUR
                            </button>
                        </span>

                        {creatorsOpen ? (
                            <SelectSearch
                                options={data.creatorsList}
                                search
                                className={creatorsOpen ? 'select-search has-focus' : ''}
                                printOptions="on-focus"
                                //printOptions="always"
                                placeholder="Veldu vefsíðu"
                                value={creator}
                                onChange={setCreator}
                                filterOptions={fuzzySearch}
                            />
                        ) : null}
                        {creator ? (
                            <div className="flex mt-1 mb-4 ml-2 mr-2 justify-evenly">
                                <div
                                    onClick={() => {
                                        addFilter(creator, 'creators', 'In');
                                        setCreator('');
                                        setCreatorsOpen(false);
                                    }}
                                    className="flex px-1 mt-2 mr-2 font-medium text-green-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                    Niðurstöður með
                                </div>
                                <div
                                    onClick={() => {
                                        addFilter(creator, 'creators', 'Nin');
                                        setCreator('');
                                        setCreatorsOpen(false);
                                    }}
                                    className="flex px-1 mt-2 ml-2 font-medium text-red-700 bg-gray-800 border border-gray-500 border-solid rounded-sm outline-none text-s hover:bg-gray-600 focus:outline-none">
                                    Niðurstöður án
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="w-full">
                        <div className="flex items-end w-full p-3"></div>
                    </div>
                </div>
                <div className="flex flex-col w-full p-3 h-2/3">
                    {query.categoriesIn.length > 0 || query.categoriesNin.length > 0 ? (
                        <div className="relative w-full mb-2 bg-gray-500 rounded max-h-1/2 scrollbar-thumb-gray-600">
                            <div className="h-full pt-2 pb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md rtl-grid">
                                <span
                                    className="absolute right-0"
                                    style={{
                                        top: '-0.5rem'
                                    }}>
                                    <span className="pb-0 pl-1 bg-gray-700 rounded-bl-sm">
                                        <span className="text-xs font-black leading-none text-gray-400">
                                            FLOKKAR
                                        </span>
                                    </span>
                                </span>

                                <div className="ml-3 mr-1 ltr-grid">
                                    {query.categoriesIn.length > 0 ? (
                                        <RenderCategoryItem
                                            array={query.categoriesIn}
                                            operation={'categoriesIn'}
                                        />
                                    ) : null}

                                    {query.categoriesNin.length > 0 ? (
                                        <RenderCategoryItem
                                            array={query.categoriesNin}
                                            operation={'categoriesNin'}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {query.creatorsIn.length > 0 || query.creatorsNin.length > 0 ? (
                        <div className="relative w-full mt-2 bg-gray-500 rounded max-h-1/2 scrollbar-thumb-gray-600">
                            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md rtl-grid">
                                <span className="absolute right-0" style={{ top: '-0.5rem' }}>
                                    <span className="pb-0 pl-1 bg-gray-700 rounded-bl-sm">
                                        <span className="text-xs font-black leading-none text-gray-400">
                                            VEFSÍÐUR
                                        </span>
                                    </span>
                                </span>

                                <div className="ml-3 mr-1 ltr-grid">
                                    {query.creatorsIn.length > 0 ? (
                                        <RenderCategoryItem
                                            array={query.creatorsIn}
                                            operation={'creatorsIn'}
                                        />
                                    ) : null}

                                    {query.creatorsNin.length > 0 ? (
                                        <RenderCategoryItem
                                            array={query.creatorsNin}
                                            operation={'creatorsNin'}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="fixed z-40 bottom-5 right-4 ">
                {areFilters() ? (
                    <button
                        className="mr-20 align-bottom outline-none select-none focus:outline-none"
                        onClick={() => dispatch(resetQuery())}>
                        <span
                            className={`z-20 flex items-center focus:outline-none justify-center w-16 h-16   rounded-full ${
                                isOpen ? 'bg-black' : 'bg-gray-500'
                            }`}>
                            <source src="/remove-filters.svg" type="image/svg+xml" />
                            <img className="pt-2.5 h-12" alt="test" src="/remove-filters.svg" />
                        </span>
                    </button>
                ) : null}
                <button
                    className="w-16 h-16 mr-2 rounded-full select-none focus:outline-none"
                    aria-label="Open Menu"
                    onClick={drawer}>
                    <div
                        id="box"
                        className={` w-16 h-16 z-30 rounded-full tham tham-e-squeeze tham-w-8 
                            ${isOpen ? 'bg-black tham-active' : 'bg-gray-500'}
                        `}>
                        <div className="z-40 tham-box">
                            <div className="z-30 bg-white tham-inner" />
                        </div>
                    </div>
                </button>
            </div>
        </nav>
    );
}
