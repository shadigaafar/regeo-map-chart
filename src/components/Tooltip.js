import React from "react";
import PropTypes from "prop-types";
import worldAr from "../docs/locales/world.ar.json";
import useCursorPos from "../hooks/useCursorPos";
import ReactCountryFlag from "react-country-flag";
import TooltipStyle from "./Tooltip.module.css";

function Tooltip({
    isActive,
    pointedAtRegion,
    getRegionDataByID,
    regionNamesText,
    tooltipBackgroundColor,
}) {
    const { siteLang, cursorCoordinates } = useCursorPos();
    const { x, y } = cursorCoordinates;

    const selectedRegionData = getRegionDataByID(pointedAtRegion?.id);

    const arabicRegionTextName = worldAr.regions.filter(
        (region) => region.id === pointedAtRegion?.id
    )[0];

    const customRegionTextName = regionNamesText?.regions.filter(
        (region) => region.id === pointedAtRegion?.id
    );

    if (!isActive) return null;
    return (
        <div
            className={TooltipStyle.container}
            style={{
                top: y,
                left: x + 30,
                backgroundColor: tooltipBackgroundColor,
            }}
        >
            <div className={TooltipStyle.titleWrapper}>
                <ReactCountryFlag
                    countryCode={pointedAtRegion?.id}
                    svg
                    style={{ fontSize: "2em" }}
                />
                <strong className={TooltipStyle.title}>
                    {siteLang === "ar"
                        ? arabicRegionTextName.name
                        : customRegionTextName
                        ? customRegionTextName?.name
                        : pointedAtRegion?.name}
                </strong>
            </div>

            {selectedRegionData
                ? Object.entries(selectedRegionData).map((entry, index) => (
                      <div key={index} className={TooltipStyle.content}>
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
