import React, { useContext } from "react";

const MapDataContext = React.createContext();

export const useMapData = () => {
    return useContext(MapDataContext);
};
export const MapDataProvider = ({ data, children }) => {
    const isData = data && Array.isArray(data) ? true : false;

    const value = {
        data,
        isData,
    };
    return (
        <MapDataContext.Provider value={value}>
            {children}
        </MapDataContext.Provider>
    );
};
