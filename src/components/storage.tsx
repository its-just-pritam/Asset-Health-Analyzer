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
        return 0;
    } else if(JSON.parse(localStorage.getItem('assets')!).pointid === undefined ) {
        return 0;
    } else {
        return JSON.parse(localStorage.getItem('assets')!).pointid;
    }
};