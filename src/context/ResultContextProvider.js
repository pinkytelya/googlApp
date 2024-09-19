import React, {createContext, useContext, useState} from "react";
import axios from 'axios';

const ResultContext = createContext();
const baseUrl = 'https://google-api31.p.rapidapi.com/websearch';

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getResults = async (type) => {
        setIsLoading(true);

        let url = '';
        let data = {};

        if (type === 'web') {
            url = 'https://google-api31.p.rapidapi.com/websearch';
            data = {
                text: searchTerm,
                safesearch: 'off',
                timelimit: '',
                region: 'wt-wt',
                max_results: 20
            };
        } else if (type === 'images') {
            url = 'https://google-api31.p.rapidapi.com/imagesearch';
            data = {
                text: searchTerm,
                safesearch: 'off',
                region: 'wt-wt',
                color: '',
                size: '',
                type_image: '',
                layout: '',
                max_results: 100
            };
        } else if (type === 'videos') {
            url = 'https://google-api31.p.rapidapi.com/videosearch';
            data = {
                text: searchTerm,
                safesearch: 'off',
                timelimit: '',
                duration: '',
                resolution: '',
                region: 'wt-wt',
                max_results: 50
            };
        } else if (type === 'news') {
            url = 'https://google-api31.p.rapidapi.com/';
            data = {
                text: searchTerm,
                region: 'wt-wt',
                max_results: 25
            };
        }

        const options = {
            method: 'POST',
            url,
            headers: {
                'x-rapidapi-key': 'febdca1c05msh68143d30e902e0fp1913a0jsnf8b96dd023c8',
                'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data,
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
             if (type === 'news') {
                setResults(response.data.news);
            } else {
                setResults(response.data.result);
            }
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false)
    }

    return (
        <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);