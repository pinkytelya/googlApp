import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { url: '/search', text: '🔎 All' },
    { url: '/news', text: '📰 News' },
    { url: '/images', text: '📸 Images' },
    { url: '/videos', text: '📺 Videos' },
];

export const Links = () => (
    <div className="mb-3 flex sm:justify-around justify-between items-center mt-4">
        {links.map(({ url, text }) => (
            <NavLink
                to={url}
                className={({ isActive }) =>
                    `text-gray-700 dark:text-gray-300 px-2 py-1 ${isActive ? 'border-b-4 border-neutral-950 dark:border-neutral-200' : ''}`
                }
            >
                {text}
            </NavLink>
        ))}
    </div>
);
