import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Result from './Result';

const RoutesComponent = () => {
    return (
        <div className="p-4">
            <RouterRoutes>
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path="/search" element={<Result />} />
                <Route path="/images" element={<Result />} />
                <Route path="/news" element={<Result />} />
                <Route path="/videos" element={<Result />} />
            </RouterRoutes>
        </div>
    );
};

export default RoutesComponent;
