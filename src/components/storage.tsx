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

export const getPointsData = async () => {

    let returnData = [{
            "value": "---Select an Asset---",
            "text": "---Select an Asset---"
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
                "value": index+1,
                "text": item.deviceId
            };
        });
        await returnData.unshift({
            value: "---Select an Asset---",
            text: "---Select an Asset---"
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