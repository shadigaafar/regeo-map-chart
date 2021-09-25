# Regeo Map Chart


React Component for Geo Chart

## Features Not Existed In Google Geo Chart
- **يدعم اللغة العربية بشكل كامل**
-  **Support RTL**
- **Localization Support**


## Installation
```sh
npm i regeo-map-chart
```


<img src="https://raw.githubusercontent.com/shadigaafar/regeo-map-chart/main/example.gif" alt="Regeo Map Chart"/>

## Quick Start
```javascript
import React from "react";
import { ReGeoMapChart } from "regeo-map-chart";

const data = [
     ["Region", "Users", "Active Users"],
    ["de", 252552, 25000],
    ["us", 852552, 162306],
    ["br", 452552, 52794],
    ["ca", 544445, 27229],
    ["fr", 652552, 277416],
    ["ru", 752751, 27410],
];
function App() {
    return (
        <div>
            <ReGeoMapChart data={data} width={350}/>
        </div>
    );
}

export default App;

```

## Customization
```javascript
import React from "react";
import { ReGeoMapChart } from "regeo-map-chart";

const data = [
     ["Region", "Users", "Active Users"],
    ["de", 252552, 25000],
    ["us", 852552, 162306],
    ["br", 452552, 52794],
    ["ca", 544445, 27229],
    ["fr", 652552, 277416],
    ["ru", 752751, 27410],
];
function ExampleGeoChart() {
    return (
            <ReGeoMapChart data={data}
             width={350}
             datalessRegionColor="#FDE2E2"
             datafulRegionColor="#1AC258"
             backgroundColor="#fff"
             hideMapLegend={true}
             />
    );
}

export default ExampleGeoChart;

```

<!-- ## Localizing Countries Names
By default Countries Name will be in English or Arabic depending on the app language. for adding other languages, you can pass an object or json file to the prop ``regionNamesText`` in this format:

```json
{
    "regions": [
        {
            "id": "ad",
            "name": "أندورا"
        },
        {
            "id": "ae",
            "name": "الإمارات العربية المتحدة"
        },
        {
            "id": "af",
            "name": "أفغانستان"
        },
        ....
    ]
}

```
please make to make your localization json based on this one: -->