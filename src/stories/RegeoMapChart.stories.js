import { ReGeoMapChart } from "../components/ReGeoMapChart";
export default {
    title: "Regeo Map Chart",
    component: ReGeoMapChart,
};
const data = [
    ["Region", "Users", "Active Users"],
    ["de", 252552, 25000],
    ["us", 852552, 162306],
    ["br", 452552, 52794],
    ["ca", 544445, 27229],
    ["fr", 652552, 277416],
    ["ru", 752751, 27410],
];

export const ReGeoMapChartStory = () => <ReGeoMapChart data={data} />;
