export const extend = (destination = {},...sources ) => {
    sources.forEach(source => {
        Object.keys(source).forEach(key => {
            if(typeof source[key] == 'object'){
                destination[key] = extend(destination[key] || {}, source[key]);
            } else {
                destination[key] = source[key];
            }
        })
    })
    return Object.assign({}, destination);
};