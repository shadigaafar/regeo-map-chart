# Regeo Map Chart

مًكوّن ريأكت لـ المخططات البيانية الجغرافية

## ميزات جديدة

- تم إضافة خاصية `style`
- تم إضافة أعلام الدول
- تستطيع الآن تخصيص لون حدود المناطق عبر الخاصية `strokeColor`
- يمكنك تخصيص لون خلفية «رسالة التلميح» عبر الخاصية: `tooltipBackgroundColor`

## ميزات غير متوفرة في Google Geo Chart

- **يدعم اللغة العربية بشكل كامل**
- **يدعم اليمين إلى اليسار**
- **يدعم الترجمة إلى لغات أخرى**

## التنصيب

```sh
npm i regeo-map-chart
```

<img src="https://raw.githubusercontent.com/shadigaafar/regeo-map-chart/main/regoeMap-example.gif" alt="Regeo Map Chart"/>

## بداية سريعة

```javascript
import React from 'react';
import { ReGeoMapChart } from 'regeo-map-chart';

const data = [
	['Region', 'Users', 'Active Users'],
	['de', 252552, 25000],
	['us', 852552, 162306],
	['br', 452552, 52794],
	['ca', 544445, 27229],
	['fr', 652552, 277416],
	['ru', 752751, 27410],
];
function App() {
	return (
		<div>
			<ReGeoMapChart data={data} width={350} />
		</div>
	);
}

export default App;
```

## التخصيص

```javascript
import React from 'react';
import { ReGeoMapChart } from 'regeo-map-chart';

const data = [
	['Region', 'Users', 'Active Users'],
	['de', 252552, 25000],
	['us', 852552, 162306],
	['br', 452552, 52794],
	['ca', 544445, 27229],
	['fr', 652552, 277416],
	['ru', 752751, 27410],
];
function ExampleGeoChart() {
	return (
		<ReGeoMapChart
			data={data}
			width={350}
			datalessRegionColor="#FDE2E2"
			datafulRegionColor="#1AC258"
			backgroundColor="#fff"
			hideMapLegend={true}
			strokeColor="#737373"
			tooltipBackgroundColor="#082032"
			style={{ maxWidth: 500 }} //التنسيق يُطبق على الـ div الذي يلف عنصر svg
		/>
	);
}

export default ExampleGeoChart;
```

## ترجمة أسماء البلدان

بشكل افتراضي ، سيكون اسم البلدان باللغة الإنجليزية أو العربية اعتمادًا على خاصية `lang` لعلامة html للتطبيق أو موقع الويب. لإضافة لغات أخرى ، يمكنك تمرير كائن أو ملف json إلى الخاصية `regionNamesText` بهذا التنسيق:

```json
{
    "regions": [
        {
            "id": "ad",
            "name": "Andorra"
        },
        {
            "id": "ae",
            "name": "United Arab Emirates"
        },
        {
            "id": "af",
            "name": "Afghanistan"
        },
        ...]
}

```

ملاحظة: نظرًا لأن الترتيب والهيكل مهمان، يرجى التأكد من جعل ملف json للترجمة موافقا لهذا: https://github.com/shadigaafar/regeo-map-chart/blob/main/src/docs/locales/world.en.json.
