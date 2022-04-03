import { useEffect, useState } from "react";
import useLanguageInfo from "./useLanguageInfo";

const useCursorPos = () => {
	const [cursorCoordinates, setCursorCoordinates] = useState({
		x: "",
		y: "",
	});

	const { siteDir, siteLang, isRTL } = useLanguageInfo();
	useEffect(() => {
		function handleOnMouseMove(e) {
			const x = e.offsetX;
			const y = e.offsetY;

			setCursorCoordinates({ x, y });
		}
		document.addEventListener("mousemove", handleOnMouseMove);
		return () => {
			document.removeEventListener("mousemove", handleOnMouseMove);
		};
	}, [siteDir]);
	return { siteLang, siteDir, cursorCoordinates, isRTL };
};

export default useCursorPos;
