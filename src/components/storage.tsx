import axios from "axios";

export const storageDataParams = () => {
    if( JSON.parse(localStorage.getItem('parameters')!) === ( undefined || null ) ) {
        return ["Select a variable!"];
    } else if(JSON.parse(localStorage.getItem('parameters')!).params === undefined ) {
        return ["Select a variable!"];
    } else if(JSON.parse(localStorage.getItem('parameters')!).params[0] === undefined ) {
        return ["Select a variable!"];
    } 
     else {
        return JSON.parse(localStorage.getItem('parameters')!).params;
    }
};

const convertArrayToObject = (array: any) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
      return {
        ...obj,
        [item]: [null, null],
      };
    }, initialValue);
};

export const storageDataRules = () => {

    let dummyParams = storageDataParams();
    let dummyLimits = convertArrayToObject(dummyParams);

    if( JSON.parse(localStorage.getItem('rules')!) === ( undefined || null ) ) {
        return dummyLimits;
    } else if(JSON.parse(localStorage.getItem('rules')!).limits === undefined ) {
        return dummyLimits;
    } else if(JSON.parse(localStorage.getItem('rules')!).limits[`${dummyParams[0]}`] === undefined ) {
        return dummyLimits;
    }
     else {
        return JSON.parse(localStorage.getItem('rules')!).limits;
    }
};

export const storageDataAssets = () => {
    if( JSON.parse(localStorage.getItem('assets')!) === ( undefined || null )) {
        return "---Select an Asset---";
    } else if(JSON.parse(localStorage.getItem('assets')!).devid === undefined ) {
        return "---Select an Asset---";
    } else {
        return JSON.parse(localStorage.getItem('assets')!).devid;
    }
};

export const storageDataAssetPoints = () => {
    if( JSON.parse(localStorage.getItem('assets')!) === ( undefined || null )) {
        return 0;
    } else if(JSON.parse(localStorage.getItem('assets')!).pointid === undefined ) {
        return 0;
    } else {
        return JSON.parse(localStorage.getItem('assets')!).pointid;
    }
};

export const getPointsData = async (token: any) => {

    let returnData = [{
            "dev": "---Select an Asset---",
            "point": 0
        }];
    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/points`;

    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    .then(async (res) => {
        console.log(res.data);
        returnData = await res.data.map((item: any, index: any) => {
            return {
                "dev": item.deviceId,
                "point": item.pointId
            };
        });
        await returnData.unshift({
            "dev": "---Select an Asset---",
            "point": 0
        });
        // console.log(returnData);
    }).catch((err) => {
        console.log(err);
    });

    return returnData;
    
};

export const getParamsData = async (token: any) => {

    let returnData: string[] = [];

    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/metadata?deviceId=${storageDataAssets()}`;
    
    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    .then(async (res) => {
        console.log(res.data.variables);
        returnData = res.data.variables;
    }).catch((err) => {
        console.log(err);
    });

    return returnData;
}

export const getChartsData = async (start: Date, end: Date, token: any) => {

    let returnData: any[] = [];
    const pointID = storageDataAssetPoints();

    const beg = start.toUTCString();
    const fin = end.toUTCString();

    await console.log(beg + " " + fin);

    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/events?pointId=${pointID}&start=${beg}&end=${fin}`;

    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    .then(async (res) => {
        console.log(res.data);
        returnData = res.data;
    }).catch((err) => {
        console.log(err);
    });

    return returnData;
}

export const getPredictionData = async (token: any, count: any) => {

    let returnData = null;
    const pointID = storageDataAssetPoints();
    const variables = storageDataParams();
    const URLvariables = variables.map((item: any) => `&properties=${item}`);

    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/predict?pointId=${pointID}&count=${count}${URLvariables.join('')}`;

    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    .then(async (res) => {
        // console.log(res.data);
        returnData = res.data;
    }).catch((err) => {
        console.log(err);
    });

    return returnData;
}