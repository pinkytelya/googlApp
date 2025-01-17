import React, {useEffect, useState} from 'react';
import {Links} from './Links';
import {useDebounce} from "use-debounce";

import { useResultContext } from '../context/ResultContextProvider';

const Search = () => {
    const { setSearchTerm } = useResultContext();
    const [text, setText] = useState('Taylor Swift');
    const [debouncedValue] = useDebounce(text, 300);

    useEffect(() => {
        if (debouncedValue) setSearchTerm(debouncedValue);
    }, [debouncedValue]);


    return (
        <div className="relative sm:ml-35 md:ml-50 sm:-mt-10 mt-3">
            <input
                value={text}
                type="text"
                className="sm:w-80 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
                placeholder="🔎 Search Google or type URL"
                onChange={(e) => setText(e.target.value)}
            />
            {text !== '' && (
                <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => setText('')}>
                    x
                </button>
            )}
            <Links />
        </div>
    );
};

export default Search;