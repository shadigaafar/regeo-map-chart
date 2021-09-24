import { useEffect, useState } from "react";

const useLanguageInfo = () => {
    const [siteLang, setSiteLang] = useState("en");
    const [siteDir, setSiteDir] = useState("ltr");
    useEffect(() => {
        const websiteLang = document.documentElement.lang;
        const websiteDir = document.documentElement.dir;
        setSiteLang(websiteLang);
        setSiteDir(websiteDir);
    }, []);

    const isRTL = siteDir === "rtl" ? true : false;
    return { siteDir, siteLang, isRTL };
};

export default useLanguageInfo;
