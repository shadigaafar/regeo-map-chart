import { useCallback, useState } from "react";
import { useMapData } from "../contexts/MapDataProvider";
import worldMapData from "../docs/world.json";

/**
 *
 * @param {*} layers layers
 * @param {*} layerIndex the index of selected the layer to be pushed to the end of layers' array
 * @returns an object with new layers and the id of the layer that has been moved the last of the array
 */
const moveSelectedLayerToLastPositionInLayersArray = (layers, layerIndex) => {
	if (layers.length === 0) return null;
	const filter = layers.filter((_item, index) => index !== layerIndex);

	const newLayers = [...filter];
	newLayers.push(layers[layerIndex]);
	const layerID = layers[layerIndex].id;
	return { newLayers, layerID };
};

const convertValueToPercentage = (totalvalue, value) => {
	const percentage = value / totalvalue;
	return percentage;
};

function hexToRgba(hex, customOpacity) {
	hex = hex.replace(/#/g, "");
	if (hex.length === 3) {
		hex = hex
			.split("")
			.map(function (hex) {
				return hex + hex;
			})
			.join("");
	}
	const opacity = customOpacity ? customOpacity : 1;
	var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(
		hex
	);
	if (!result) {
		return null;
	}
	const red = parseInt(result[1], 16);
	const green = parseInt(result[2], 16);
	const blue = parseInt(result[3], 16);

	return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

const useData = (datafulRegionColor = "") => {
	const { layers } = worldMapData;
	const [regionLayer, setRegionLayer] = useState(() => ({
		newLayers: layers,
		layerID: "",
	}));
	const [pointedAtRegion, setPointedAtRegion] = useState({});
	const [
		pointedAtRegionValueInPercentage,
		setPointedAtRegionValueInPercentage,
	] = useState(0);
	const { data, isDataAvailable } = useMapData();

	const getRegionDataByID = (id) => {
		if (!id || !isDataAvailable) return null;
		const row = data.filter((r) => r[0] === id);
		const _row =
			row.length > 0
				? row[0].filter((r, _index, arr) => arr.indexOf(r) !== 0)
				: null;

		const columns = [...data[0]];
		columns.shift();

		let regionData = {};

		if (_row && _row.length > 0) {
			columns.forEach((col, i) => {
				regionData[col] = _row[i];
			});
		}

		return regionData;
	};

	const getPointedAtRegionValue = () => {
		if (Object.entries(pointedAtRegion).length === 0) return null;
		const value = Object.values(
			getRegionDataByID(pointedAtRegion.id)
		).filter((v, _i, arr) => arr.indexOf(v) === 0);
		return value[0];
	};

	const changeZIndexOfSelectedLayer = (index) => {
		//note: this for putting the selected layer to top in order not
		//to be overlapped with surrounded layer so that the red stroke on selection appear clearly
		//you might be asking why not using <use/> tag to duplicate it in order to show on the top,
		// but believe me I have tried that, but It makes the whole selection breaks.
		setRegionLayer(
			moveSelectedLayerToLastPositionInLayersArray(
				regionLayer.newLayers,
				index
			)
		);
	};

	const rows = data?.filter((itm, _i, arr) => arr.indexOf(itm) !== 0);

	const secondColumnCellValues = rows?.map((r) => r[1]);
	const secondColumnCellValuesSorted = secondColumnCellValues?.sort(
		(a, b) => b - a
	);

	const getSingleRow = (id) => {
		const row = rows?.filter((r) => r[0] === id);
		return row;
	};

	const getSecondColumnSingleValue = (rowId) => {
		const row = getSingleRow(rowId);
		const cellValue = row.length > 0 ? row[0][1] : null;
		return cellValue;
	};
	const generatePercentageOfRegionValue = (id) => {
		if (!isDataAvailable) return null;

		const percentage = convertValueToPercentage(
			secondColumnCellValuesSorted[0],
			getSecondColumnSingleValue(id)
		);

		setPointedAtRegionValueInPercentage(percentage);
		return percentage;
	};
	const regionsColor = datafulRegionColor ? datafulRegionColor : "#047FFE";

	const getRegionColorWithExtremelySmallRatioValue = () => {
		const notExceededMinPercentage = secondColumnCellValues.every(
			(cellValue) => {
				const percentage = convertValueToPercentage(
					secondColumnCellValuesSorted[0],
					cellValue
				);

				return percentage > 0.2;
			}
		);

		return notExceededMinPercentage ? false : "#C4BF9C";
	};
	const handleOnMouseOver = (index, layer) => {
		changeZIndexOfSelectedLayer(index);
		setPointedAtRegion(layer);

		generatePercentageOfRegionValue(layer.id);
	};

	const handleOnMouseOut = () => {
		setRegionLayer((prev) => ({
			...prev,
			layerID: "",
		}));
		setPointedAtRegion({});
		setPointedAtRegionValueInPercentage(0);
	};

	const colorizeRegions = (layerId) => {
		if (!isDataAvailable) return null;

		const regionCodes = rows.map((r) => r[0]);

		if (
			getSecondColumnSingleValue(layerId) &&
			regionCodes.includes(layerId)
		) {
			const percentage = convertValueToPercentage(
				secondColumnCellValuesSorted[0],
				getSecondColumnSingleValue(layerId)
			);

			const valueRatio = percentage < 0.2 ? 1 : percentage;
			const regionColor =
				percentage < 0.2
					? getRegionColorWithExtremelySmallRatioValue()
					: regionsColor;

			return hexToRgba(regionColor, valueRatio);
		}
	};

	const getMapDataMaxAndMinValues = () => {
		if (!isDataAvailable) return null;
		const max = secondColumnCellValuesSorted[0];
		const min =
			secondColumnCellValuesSorted[
				secondColumnCellValuesSorted.length - 1
			];
		return { min, max };
	};

	const getLegendPointerArrowPosition = (legendBarWidth) => {
		if (!pointedAtRegionValueInPercentage) {
			return null;
		}
		const positionX = pointedAtRegionValueInPercentage * legendBarWidth;
		const { min } = getMapDataMaxAndMinValues();
		if (getPointedAtRegionValue() === min) return 0;
		return positionX;
	};

	const getMinValueAssociatedColor = () => {
		const { min, max } = getMapDataMaxAndMinValues();
		const percentage = getRegionColorWithExtremelySmallRatioValue()
			? 1
			: convertValueToPercentage(max, min);
		const color = getRegionColorWithExtremelySmallRatioValue()
			? getRegionColorWithExtremelySmallRatioValue()
			: regionsColor;
		return hexToRgba(color, percentage);
	};

	return {
		getRegionDataByID,
		colorizeRegions,
		regionsColor,
		getMapDataMaxAndMinValues,
		worldMapData,
		pointedAtRegion,
		regionLayer,
		handleOnMouseOut,
		handleOnMouseOver,
		getLegendPointerArrowPosition,
		getMinValueAssociatedColor,
		isDataAvailable,
	};
};

export default useData;
