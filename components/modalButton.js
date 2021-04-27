import React from 'react';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';

import {
    addToCreatorsIn,
    removeFromCreatorsIn,
    addToCreatorsNin,
    removeFromCreatorsNin,
    addToCategoriesIn,
    removeFromCategoriesIn,
    addToCategoriesNin,
    removeFromCategoriesNin,
    selectQuery
} from '../store/slices/querySlice';

const CreatorButton = ({ name, operation, style }) => {
    const modalRef = React.useRef();
    const dispatch = useDispatch();
    const query = useSelector(selectQuery);

    const [isFilter, setIsFilter] = React.useState('');

    const openModal = () => {
        modalRef.current.openModal();
    };

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
        console.log(`checkIfAlreadyInReveres`);
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

    return (
        <div className="relative inline-block group">
            <button
                className={`${style} ${isAFilter(name) ? 'border-gray-800' : ''}`}
                onClick={() => {
                    getCurrentChecked(operation, name);
                    openModal();
                }}>
                <span className="flex-1 pr-1 font-semibold">{name}</span>
            </button>

            <Modal ref={modalRef}>
                <div
                    className="p-3 border-b border-gray-500 last:border-b-0"
                    onClick={() => {
                        !isFilter ? '' : unCheckFilter(name, operation);
                    }}>
                    <input
                        id="radio1"
                        type="radio"
                        name="radio"
                        className="hidden"
                        defaultChecked={!isFilter ? true : false}
                    />
                    <label
                        htmlFor="radio1"
                        className="flex items-center justify-between text-xl text-gray-400 transition cursor-pointer hover:text-gray-300">
                        {!isFilter ? 'Halda óbreyttu' : 'Afvelja leitarskilyrði'}
                        <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full flex-no-shrink"></span>
                    </label>
                </div>

                <div
                    className="p-3 border-b border-gray-500 last:border-b-0 "
                    onChange={() => {
                        addFilter(name, operation, 'In');
                    }}>
                    <input
                        id="radio2"
                        type="radio"
                        name="radio"
                        className="hidden"
                        defaultChecked={isFilter == 'filterWith' ? true : false}
                    />
                    <label
                        htmlFor="radio2"
                        className="flex items-center justify-between text-xl text-gray-400 transition cursor-pointer hover:text-gray-300 ">
                        Niðurstöður með
                        <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full shadow-inner flex-no-shrink"></span>
                    </label>
                </div>
                <div
                    className="p-3 border-b border-gray-500 last:border-b-0"
                    onChange={() => {
                        addFilter(name, operation, 'Nin');
                    }}>
                    <input
                        id="radio3"
                        type="radio"
                        name="radio"
                        className="hidden"
                        defaultChecked={isFilter == 'filterWithout' ? true : false}
                    />
                    <label
                        htmlFor="radio3"
                        className="flex items-center justify-between text-xl text-gray-400 transition cursor-pointer hover:text-gray-300">
                        Niðurstöður án
                        <span className="inline-block w-8 h-8 border-2 border-gray-400 rounded-full flex-no-shrink"></span>
                    </label>
                </div>
            </Modal>
        </div>
    );
};
export default CreatorButton;
