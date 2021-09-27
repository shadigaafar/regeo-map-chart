import React from "react";
import { MapDataProvider } from "../contexts/MapDataProvider";
import ReMap from "./ReMap";
import world from "../docs/world.json";
import PropTypes from "prop-types";

export const ReGeoMapChart = (props) => {
    return (
        <MapDataProvider data={props.data}>
            <ReMap {...world} {...props} />
        </MapDataProvider>
    );
};

ReGeoMapChart.defaultProps = {
    datalessRegionColor: "#D3D3D3",
    datafulRegionColor: "#047FFE",
    backgroundColor: "",
    hideMapLegend: false,
    width: "",
    strokeColor: "#fff",
};
ReGeoMapChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.array).isRequired,
    layerProps: PropTypes.any,
    datalessRegionColor: PropTypes.string,
    datafulRegionColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    regionNamesText: PropTypes.shape({
        region: [
            {
                id: PropTypes.string,
                name: PropTypes.string,
            },
        ],
    }),
    hideMapLegend: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeColor: PropTypes.string,
};
