import { storageDataParams } from "./storage";
let params = storageDataParams();

export function changeData(data: any, pos: any) {
  let faultydata = [];
  let id = 1;

  for (let j=0;j<data[pos].length;j++) {
      let myobj = { id: 0, value: 0, time: "" };
      myobj.id = id++;
      myobj.time = new Date(data[pos][j][0]).toLocaleString().split("G")[0];
      myobj.value = data[pos][j][1];
      faultydata.push(myobj);
    }
  
  return faultydata;
}

export function fetchFaultyData(APIata: any, params: any, limits: any) {
  
  console.log(APIata);
  if (APIata === null) return [];

  let newData = [];

  for (let i=0; i<params.length;i++) {
      let elem;

      let userFault = ( limits[`${params[i]}`][0] === null && limits[`${params[i]}`][1] === null )? false : true;

        let TableFaults = (userFault)?
        APIata.map((elem: any) => {
          let larger = ( limits[`${params[i]}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${params[i]}`][1];
          let smaller = ( limits[`${params[i]}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${params[i]}`][0];
          return ( parseFloat(elem[params[i]]?.toFixed(2)) > larger || parseFloat(elem[params[i]]?.toFixed(2)) < smaller )? 1 : 0;
        }) : 
        APIata?.map((item: any) => item[`outliers`][params[i]] );

      elem = APIata?.map((item: any, index: any) => [
        item.EventEnqueuedUtcTime,
        TableFaults[index] * parseFloat(item[params[i]]?.toFixed(2)),
      ]);
      elem = elem.filter((item: any) => {
        return item[1] !== 0;
      });

      newData.push(elem);
    }
  return newData;
}

export function handleFaults(APIdata: any, params: any) {
  let newData = [];

  for (let i=0; i<params.length; i++) {
      let elem;

      elem = APIdata?.map((item: any) => item[`outliers`][params[i]]);

      newData.push(elem);
    }
  return newData;
}

export function handleTimestamps(APIdata: any, params: any) {
  let newData = [];

  for (let i=0; i<params.length ;i++) {
      let elem;
      elem = APIdata?.map((item: any) =>
        new Date(item.EventEnqueuedUtcTime).toLocaleString()
      );

      newData.push(elem);
    }
  return newData;
}

export function fetchFaultyPredData(APIata: any, params: any, limits: any) {
  if (APIata === null) return [];

  let newData = [];

  for (let i=0;i<params.length;i++) {
      let elem: any = [];

      if (APIata[`${params[i]}`] !== undefined) {

        let userFault = ( limits[`${params[i]}`][0] === null && limits[`${params[i]}`][1] === null )? false : true;

        let TableFaults = (userFault)?
        APIata[`${params[i]}`][`pred`].map((elem: any) => {
          let larger = ( limits[`${params[i]}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${params[i]}`][1];
          let smaller = ( limits[`${params[i]}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${params[i]}`][0];
          return ( parseFloat(elem.toFixed(2)) > larger || parseFloat(elem.toFixed(2)) < smaller )? 1 : 0;
        }) : APIata[`${params[i]}`][`outliers`];

        elem = APIata[`${params[i]}`][`pred`].map((item: any, index: any) => [
          new Date(APIata[`timestamp_array`][index]).toString(),
          TableFaults[index] * parseFloat(item.toFixed(2)),
        ]);
        elem = elem.filter((item: any) => {
          return item[1] !== 0;
        });
      }
      newData.push(elem);
    }
  return newData;
}
