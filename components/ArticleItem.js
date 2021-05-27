import 'moment/locale/is';

import * as moment from 'moment';
import dynamic from 'next/dynamic';
import React from 'react';

import ModalButton from './ModalButton';
const ShowMoreAnimated = dynamic(() => import('./ShowMoreAnimated'), { ssr: false });

export default function ArticleItem({ article }) {
    const [showContent, setShowContent] = React.useState(false);

    const handleSelect = () => setShowContent(!showContent);

    return (
        <div className="p-3 pt-2 mx-auto bg-black border-b border-gray-600 first:pt-10 last:border-0 max-w-m ">
            <div id="content-container " className="flex">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex flex-row justify-between mb-1">
                        <a
                            href={article.url}
                            className="pr-1 text-lg leading-none text-gray-200 hover:text-gray-50">
                            {article.title}
                        </a>

                        <ModalButton
                            name={article.creator}
                            operation="creators"
                            style="flex px-1 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-500 border-solid rounded-sm  outline-none hover:bg-gray-600 focus:outline-none select-none "
                        />
                    </div>
                    <div>
                        <ShowMoreAnimated article={article} showContent={showContent} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex">
                            <div id="button-container " className="flex flex-wrap items-end">
                                {article.categories
                                    ? article.categories.map((category, index) => {
                                          return (
                                              <ModalButton
                                                  name={category}
                                                  key={index}
                                                  operation="categories"
                                                  style="flex px-1 text-xs font-medium text-gray-300 bg-gray-800 border border-solid border-gray-500 rounded-sm outline-none hover:bg-gray-600 focus:outline-none mr-2 mt-2 select-none"
                                              />
                                          );
                                      })
                                    : null}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-end justify-end leading-none md:mr-1">
                            <div className="text-sm text-gray-400 min-w-max">
                                {moment(article.publicationDate).calendar()}
                            </div>

                            <button
                                className="px-1 mt-2 ml-2 font-medium text-green-700 bg-black border border-gray-300 border-solid rounded-sm outline-none p-0.5 select-none text-s focus:outline-none max-content"
                                type="button"
                                onClick={() => handleSelect()}>
                                {showContent ? 'Minna' : 'Meira'}
                            </button>
                        </div>
                    </div>
                </div>
                {showContent && article.image ? (
                    <div id="imageContainer" className="hidden h-full ml-2 md:flex">
                        <div className="relative pb-32 pr-32 overflow-hidden rounded">
                            <img
                                alt="Test"
                                className="absolute object-cover w-full h-full border border-gray-700 border-solid"
                                src={article.image}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
