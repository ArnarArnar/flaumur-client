import React from 'react';

export default function ArticleItem() {
    return (
        <div className="p-3 pt-2 mx-auto animate-pulse max-w-m ">
            <div id="content-container " className="flex">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex flex-row justify-between">
                        <a
                            href=""
                            className="text-lg leading-none text-gray-200 hover:text-gray-50">
                            <div className="h-5 mt-2 mr-2 bg-gray-600 rounded-sm w-60 "></div>
                        </a>

                        <div className="w-20 h-5 mt-2 mr-2 bg-gray-600 rounded-sm "></div>
                    </div>
                    <div>
                        <div className="mt-2 mb-1 text-base font-light leading-5 text-gray-400 overflow-ellipsis">
                            <div className="h-3 bg-gray-600 rounded w-72"></div>
                            <div className="w-64 h-3 mt-2 bg-gray-600 rounded"></div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex">
                            <div id="button-container " className="flex flex-wrap items-end">
                                <div className="flex w-12 h-4 mt-2 mr-2 bg-gray-600 rounded-sm"></div>
                                <div className="flex w-12 h-4 mt-2 mr-2 bg-gray-600 rounded-sm"></div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-end justify-end leading-none md:mr-1">
                            <div className="text-sm bg-gray-400 min-w-max"></div>
                            <div className="flex w-12 h-4 mt-2 mr-2 bg-gray-600 rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
