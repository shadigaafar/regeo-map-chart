import React from "react";
import useData from "../hooks/useData";
import Tooltip from "./Tooltip";
import Legend from "./Legend";
import ReMapStyle from "./ReMap.module.css";

const ReMap = ({
	layerProps,
	datalessRegionColor,
	datafulRegionColor,
	backgroundColor,
	regionNamesText,
	hideMapLegend,
	width,
	strokeColor,
	tooltipBackgroundColor,
	...other
}) => {
	const {
		pointedAtRegion,
		regionLayer,
		handleOnMouseOut,
		handleOnMouseOver,
		worldMapData: { id, name },
		colorizeRegions,
		regionsColor,
		getMapDataMaxAndMinValues,
		getLegendPointerArrowPosition,
		getMinValueAssociatedColor,
		getRegionDataByID,
		isDataAvailable,
	} = useData(datafulRegionColor);

	const legendProps = {
		regionsColor,
		getMapDataMaxAndMinValues,
		getLegendPointerArrowPosition,
		getMinValueAssociatedColor,
	};

	const toolTipProps = {
		getRegionDataByID,
		pointedAtRegion,
		tooltipBackgroundColor,
	};

	if (typeof regionLayer === "undefined") return null;
	return (
		<div
			className={ReMapStyle.container}
			style={{
				position: "relative",
				backgroundColor: backgroundColor ? backgroundColor : null,
				overflow: "visible",
				width: width,
			}}
		>
			<Tooltip
				isActive={
					Object.entries(pointedAtRegion).length !== 0 ? true : false
				}
				regionNamesText={regionNamesText}
				{...toolTipProps}
			/>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				key={id}
				aria-label={name}
				{...other}
			>
				<g>
					{regionLayer.newLayers.map((layer, index) => (
						<g key={index}>
							<path fill="#fff" {...layer} />
							<path
								id={layer.id}
								fontSize={"110px"}
								onMouseOver={() =>
									handleOnMouseOver(index, layer)
								}
								onMouseOut={handleOnMouseOut}
								fill={
									colorizeRegions(layer.id)
										? colorizeRegions(layer.id)
										: datalessRegionColor
								}
								stroke={
									layer.id === regionLayer.layerID
										? "red"
										: strokeColor
								}
								style={{
									cursor: "pointer",
									strokeWidth: 0.5,
								}}
								aria-label={layer.name}
								{...layer}
								{...layerProps}
							/>
						</g>
					))}
				</g>
			</svg>
			{isDataAvailable && !hideMapLegend ? (
				<Legend {...legendProps} />
			) : null}
		</div>
	);
};

export default ReMap;
