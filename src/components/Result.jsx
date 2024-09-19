import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import ReactPlayer from "react-player";

import {useResultContext} from "../context/ResultContextProvider";
import Loading from "../components/Loading";

const Result = () => {
    const {results, isLoading, getResults, searchTerm} = useResultContext();
    const location = useLocation();

    useEffect(() => {
        let type = 'web';

        switch (location.pathname) {
            case '/search':
                type = 'web';
                break;
            case '/images':
                type = 'images';
                break;
            case '/videos':
                type = 'videos';
                break;
            case '/news':
                type = 'news';
                break;
            default:
                console.error('Неизвестный тип поиска');
        }

        if (searchTerm) {
            getResults(type);
        }
    }, [searchTerm, location.pathname]);



    if (isLoading) return <Loading />

    switch (location.pathname) {
        case '/search':
            return (
                <div className="sm:px-110 grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    {results?.map(({ href, title }, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <a href={href} target="_blank" rel="noreferrer">
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{href}</p>
                                <p className="text-lg font-semibold hover:underline dark:text-blue-300 text-blue-700 mt-2">{title}</p>
                            </a>
                        </div>
                    ))}
                </div>
            );
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, url, title }, index) => (
                        <a
                            href={url}
                            target="_blank"
                            key={index}
                            rel="noreferrer"
                            className="sm:p-3 p-5 flex flex-col items-center"
                        >
                            <div className="relative w-48 h-48 overflow-hidden">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover rounded-md"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-sm mt-2 text-center w-48 overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
                        </a>
                    ))}
                </div>
            );
        case '/videos':
            return (
                <div className="flex flex-wrap justify-center">
                    {results?.map((content, index) => (
                        <div key={index} className="p-2">
                            <ReactPlayer url={content.content} controls width="355px" height="200px"/>
                        </div>
                    ))}
                </div>
            );
        case '/news':
            return (
                <div className="sm:px-6 lg:px-12 xl:px-24 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results?.map(({id, url, source, title, body, image}) => (
                            <div key={id} className="flex flex-col border dark:border-gray-950 rounded-lg overflow-hidden shadow-md">
                                <a href={url} target="_blank" rel="noreferrer">
                                    <div className="relative w-full h-48 bg-gray-200">
                                        <img
                                            src={image}
                                            alt={title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </a>
                                <div className="p-4 flex flex-col flex-grow">
                                    <a href={url} target="_blank" rel="noreferrer"
                                       className="text-lg font-semibold hover:underline text-blue-700 dark:text-blue-300">
                                        {title}
                                    </a>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex-grow">{body}</p>
                                    <div className="flex items-center text-sm mt-2 text-gray-500 dark:text-gray-300">
                                        <a href={source} target="_blank" rel="noreferrer" className="hover:underline">
                                            {source}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )

        default:
            return 'ERROR';
    }
};

export default Result;