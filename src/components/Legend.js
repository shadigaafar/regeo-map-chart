import React from "react";
import downArrow from "../assets/downArrow.svg";
import useLanguageInfo from "../hooks/useLanguageInfo";

const legendContainer = {
    display: "flex",
    position: "absolute",
    bottom: "10%",
    left: "2%",
    justifyContent: "space-between",
    width: "25%",
    minWidth: 200,
    alignItems: "center",
};
const textValue = {
    fontSize: 12,
    padding: "0  10px",
};
const legendBar = {
    position: "relative",
    display: "inline-block",
    flex: 1,
    aspectRatio: "15 / 1",

    backgroundColor: "#fff",
};

const pointer = {
    position: "absolute",
    top: "-10px",
    lineHeight: 0,
};
const Legend = (props) => {
    const {
        regionsColor,
        getMapDataMaxAndMinValues,
        getLegendPointerArrowPosition,
        getMinValueAssociatedColor,
    } = props;
    const { isRTL } = useLanguageInfo();
    const { max, min } = getMapDataMaxAndMinValues();

    const legendBarGradient = {
        backgroundImage: `linear-gradient(to left,  ${
            isRTL ? getMinValueAssociatedColor() : regionsColor
        }, ${isRTL ? regionsColor : getMinValueAssociatedColor()})`,
    };
    const rightLeftPos = isRTL ? "right" : "left";
    const pointerPosition = getLegendPointerArrowPosition(100);

    return (
        <>
            <div style={legendContainer}>
                <span style={textValue}>{min}</span>
                <div style={{ ...legendBar, ...legendBarGradient }}>
                    {pointerPosition !== null ? (
                        <span
                            style={{
                                ...pointer,
                                [rightLeftPos]:
                                    pointerPosition === 0
                                        ? `calc(0% - 5px)`
                                        : `calc(${pointerPosition}% - 5px)`,
                            }}
                        >
                            <img src={downArrow} alt="downArrow" />
                        </span>
                    ) : null}
                </div>
                <span style={textValue}>{max}</span>
            </div>
        </>
    );
};

export default Legend;
