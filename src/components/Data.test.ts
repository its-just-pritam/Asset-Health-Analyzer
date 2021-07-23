/// <reference types="jest"/>
import ClientProfile from "../pages/ClientProfile";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import SelectAssets from "../pages/SelectAssets";
import UpdateVariables from "../pages/UpdateVariables";
import { handleFaults } from "./Data";
import { fetchFaultyData } from "./Data";
import { handleTimestamps } from "./Data";
import { fetchFaultyPredData } from "./Data";
import { getPrivateRoutesList } from "./PrivateRoutes/PrivateRouteConfig";
import { changeData } from "./Data";
import { PieDataConfig, PieOptionsConfig } from "./chartConfig/pie";
import { getColorsList } from "./colorParams";
import AddRules from "../pages/AddRules";

const colors = getColorsList();

const data = [
  [
    ["2021-07-08T06:24:11.5560000Z", 31.97],
    ["2021-07-08T06:24:20.8860000Z", 30.84],
    ["2021-07-08T06:24:23.0460000Z", 29.39],
  ],
  [
    ["2021-07-08T06:24:11.7630000Z", 79.25],
    ["2021-07-08T06:24:12.9000000Z", 76.66],
    ["2021-07-08T06:24:14.1230000Z", 73.93],
  ],
];

describe("more details for faults", () => {
  it("should return only outliers values", () => {
    expect(changeData(data, 0).length).toEqual(3);
  });
  it("should return only outliers values", () => {
    expect(changeData(data, 1).length).toEqual(3);
  });
});

const dummydata = [
  {
    temperature: 31.704934644459442,
    humidity: 73.40521968363876,
    EventEnqueuedUtcTime: "2021-06-30T08:20:21.1510000Z",
    outliers: {
      temperature: 1,
      humidity: 1,
    },
  },
  {
    temperature: 31.288546413576086,
    humidity: 69.57230646740621,
    EventEnqueuedUtcTime: "2021-06-30T08:20:23.3240000Z",
    outliers: {
      temperature: 1,
      humidity: 0,
    },
  },
  {
    temperature: 31.80272724381806,
    humidity: 68.509118523427,
    EventEnqueuedUtcTime: "2021-06-30T08:20:27.9800000Z",
    outliers: {
      temperature: 1,
      humidity: 0,
    },
  },
];

describe("handleFaults function unit testing", () => {
  const variables = ["temperature", "humidity"];
  it("should return only outliers values", () => {
    expect(handleFaults(dummydata, variables)).toEqual([
      [1, 1, 1],
      [1, 0, 0],
    ]);
  });
});

describe("handleFaults function unit testing", () => {
  const variables = ["temperature", "humidity"];
  it("should return only outliers values", () => {
    expect(fetchFaultyData(dummydata, variables, {
      temperature: [null, null],
      humidity: [null, null],
    })).toEqual([
      [
        ["2021-06-30T08:20:21.1510000Z", 31.7],
        ["2021-06-30T08:20:23.3240000Z", 31.29],
        ["2021-06-30T08:20:27.9800000Z", 31.8],
      ],
      [["2021-06-30T08:20:21.1510000Z", 73.41]],
    ]);
  });
});

describe("handleFaults function unit testing", () => {
  const variables = ["temperature", "humidity"];
  it("should return only outliers values", () => {
    expect(handleTimestamps(dummydata, variables).length).toEqual(2);
  });
});

describe("handleFaults function unit testing", () => {
  const variables = ["temperature", "humidity"];
  it("should return only outliers values", () => {
    expect(handleTimestamps(dummydata, variables).length).toEqual(2);
  });
});

describe("handleFaults function unit testing",  () => {
  const dummydata = {
    timestamp_array: [
      "2021-07-12T07:14:24.659621Z",
      "2021-07-12T07:15:24.653621Z",
      "2021-07-12T07:16:24.647621Z",
      "2021-07-12T07:17:24.641621Z",
    ],
    temperature: {
      pred: [
        23.088525085992156, 25.4928822289423, 27.089776038511488,
        28.13035820554434,
      ],
      score: 0.8921059900912123,
      outliers: [0, 0, 0, 0],
    },
  };

  const variables = ["temperature"];
  it("should return only outliers values", () => {
    expect(fetchFaultyPredData(dummydata, variables, {
      temperature: [null, null],
      humidity: [null, null],
    })).toEqual([[],]);
  });
  it("should return only outliers values", () => {
    expect(fetchFaultyPredData(null, variables, {
      temperature: [null, null],
      humidity: [null, null],
    })).toEqual([]);
  });
  it("should return only outliers values", () => {
    expect(fetchFaultyPredData({}, variables, {
      temperature: [null, null],
      humidity: [null, null],
    })).toEqual([[]]);
  });
});

describe("handleFaults function unit testing", () => {
  it("should return all the pages and their links", () => {
    expect(getPrivateRoutesList()).toEqual([
      {
          name:"Home",
          path:"/Home",
          component:Home,
          icon:"home",
          position: "sidebar",
          details: ""
      },
      {
          name:"Dashboard",
          path:"/Dashboard",
          component:Dashboard,
          icon:"grid",
          position: "sidebar",
          details: ""
      },
      {
          name:"Profile",
          path:"/client-profile",
          component:ClientProfile,
          icon:"user",
          position: "sidebar",
          details: ""
      },
      {
          name:"Asset",
          path:"/select-assets",
          component:SelectAssets,
          icon:"",
          position: "dashboard",
          details: "Select an Asset to view it's performance on the Dashboard"
      },
      {
          name:"Variables",
          path:"/update-variables",
          component:UpdateVariables,
          icon:"",
          position: "dashboard",
          details: "Update Variables to filter the statistics on the Dashboard"
      },
      {
          name:"Rules",
          path:"/set-rules",
          component:AddRules,
          icon:"",
          position: "dashboard",
          details: "Set custom rules to filter data points in the chart."
      }
  ]);
  });
});

describe("piedataconfig should return proper output", () => {
  const percentage = [45, 50];
  const variable = "Energy";
  it("should return an object", () => {
    expect(PieDataConfig(percentage, variable)).toEqual({
      labels: ["Faulty", "Non-Faulty"],
      datasets: [
        {
          label: "Energy",
          data: [45, 50],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          weight: 1,
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    });
  });
  it("should return proper object", () => {
    const variable = "Energy";
    expect(PieOptionsConfig(variable)).toEqual({
      responsive: true,
      animation: false,
      title: {
        text: "Energy Faults",
        display: true,
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            marginBottom: "100px",
            position: "right",
          },
        },
      },
    });
  });
});

// describe("line should return proper output", () => {
//   const xaxis = ["7/12/2021, 1:27:33 PM", "7/12/2021, 4:05:32 PM"];
//   const yaxis = [24, 32.5];
//   const variable = "Energy";
//   const bgcolors = ["red", "white"];
//   const slider = [[0, 1]];
//   const index = 0;
//   it("should return proper object", () => {
//     expect(
//       ChartDataConfig(xaxis, yaxis, variable, bgcolors, slider, index)
//     ).toEqual({
//       labels: xaxis,
//       datasets: [
//         {
//           label: "Energy",
//           fontColor: "white",
//           data: yaxis,
//           pointBackgroundColor: [],
//           backgroundColor: colors[0],
//           borderWidth: 0.5,
//           pointBorderWidth: 0,
//           borderColor: colors[index],
//           pointRadius: 1,
//           pointHoverRadius: 5,
//         },
//       ],
//     });
//   });
//   const faults = [0, 1, 0, 1];
//   // const footer = () => {
//   //   return "Faulty? No"
//   // }
//   it("ChartOptionsConfig should return proper object", () => {

//     expect(JSON.stringify(ChartOptionsConfig(variable, faults, slider, index))).toStrictEqual(
//       JSON.stringify(
//       {
//       responsive: true,
//       title: {
//           text: "Energy vs. Time",
//           display: true
//       },
//       plugins: {
//           legend: {
//               labels: {
//                   color: "white",
//                   marginBottom: "100px"
//               }
//           },
//           tooltip: {
//               callbacks: {
//               footer: () => {
//                 return "Faulty? No"
//               }
//               }
//           }
//       },
//       animation: false,
//       hover: {
//           animationDuration: 0
//       },
//       responsiveAnimationDuration: 0,
//       scales: {
//           y: {
//               ticks: {
//                   autoSkip: false,
//                   maxTicksLimit: 10,
//                   beginAtZero: true,
//                   color: "white"
//               },
//               grid: {
//                   color: "black"
//               }
//           },
//           x: {
//               ticks: {
//                   display: false,
//               },
//               grid: {
//                   display: false
//               }
//           },
//       }
//   }));
//   });
// });
