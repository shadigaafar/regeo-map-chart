import React from "react";
import downArrow from "../assets/downArrow.svg";
import useLanguageInfo from "../hooks/useLanguageInfo";
import LegendStyle from "./Legend.module.css";

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
            <div className={LegendStyle.container}>
                <span className={LegendStyle.textValue}>{min}</span>
                <div
                    className={LegendStyle.legendBar}
                    style={legendBarGradient}
                >
                    {pointerPosition !== null ? (
                        <span
                            className={LegendStyle.pointer}
                            style={{
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
                <span className={LegendStyle.textValue}>{max}</span>
            </div>
        </>
    );
};

export default Legend;
