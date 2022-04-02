import React, { useContext } from "react";

const MapDataContext = React.createContext();

export const useMapData = () => {
	return useContext(MapDataContext);
};
export const MapDataProvider = ({ data, children }) => {
	const isDataAvailable = data && Array.isArray(data) ? true : false;

	const value = {
		data,
		isDataAvailable,
	};
	return (
		<MapDataContext.Provider value={value}>
			{children}
		</MapDataContext.Provider>
	);
};
