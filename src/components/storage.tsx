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

export const getPointsData = async () => {

    let returnData = [{
            "dev": "---Select an Asset---",
            "point": 0
        }];
    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/points`;
    const token = localStorage.getItem('access_token');

    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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
        console.log(returnData);
    }).catch((err) => {
        console.log(err);
    });

    return returnData;
    
};

export const getParamsData = async () => {

    let returnData: string[] = [];

    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/metadata?deviceId=${storageDataAssets()}`;
    const token = localStorage.getItem('access_token');

    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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

export const getChartsData = async (start: any, end: any) => {

    let returnData: any[] = [];
    const pointID = storageDataAssetPoints();

    const beg = await start.toISOString().split('T')[0];
    const fin = await end.toISOString().split('T')[0];
    await console.log(beg + " " + fin);

    const URL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/events?pointId=${pointID}&start=${beg}&end=${fin}`;
    const token = localStorage.getItem('access_token');

    await axios.get(URL, {
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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