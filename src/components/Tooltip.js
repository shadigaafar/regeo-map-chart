import React from "react";
import PropTypes from "prop-types";
import worldAr from "../docs/locales/world.ar.json";
import useCursorPos from "../hooks/useCursorPos";

const tooltip = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    padding: 15,
    backgroundColor: "#E0E0E0",
    border: "1px solid black",
    zIndex: 100,
    width: "fit-content",
};

function Tooltip({
    isActive,
    pointedAtRegion,
    getRegionDataByID,
    regionNamesText,
}) {
    const { siteLang, isRTL, cursorCoordinates } = useCursorPos();
    const { x, y } = cursorCoordinates;

    const selectedRegionData = getRegionDataByID(pointedAtRegion?.id);

    const arabicRegionTextName = worldAr.regions.filter(
        (region) => region.id === pointedAtRegion?.id
    )[0];

    const customRegionTextName = regionNamesText?.regions.filter(
        (region) => region.id === pointedAtRegion?.id
    );

    const rightLeftPosition = isRTL ? "right" : "left";

    if (!isActive) return null;
    return (
        <div
            className="react-map-tooltip"
            style={{
                top: y,
                [rightLeftPosition]: x + 30,
                ...tooltip,
            }}
        >
            <strong>
                {siteLang === "ar"
                    ? arabicRegionTextName.name
                    : customRegionTextName
                    ? customRegionTextName?.name
                    : pointedAtRegion?.name}
            </strong>

            {selectedRegionData
                ? Object.entries(selectedRegionData).map((entry, index) => (
                      <div key={index} style={{ padding: "5px 0" }}>
                          <span>{entry[0]}: </span>
                          <span>{entry[1]}</span>
                      </div>
                  ))
                : null}
        </div>
    );
}

Tooltip.defaultProps = {
    isActive: false,
};
Tooltip.propTypes = {
    isActive: PropTypes.bool.isRequired,
    pointedAtRegion: PropTypes.object.isRequired,
    getRegionDataByID: PropTypes.func.isRequired,
};
export default Tooltip;
