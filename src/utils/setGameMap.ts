const setGameMap = (settings:{name: string, color: string, coupon: string, textColor: string, }[]) => {
    const result = settings.map( ({name,coupon, color,textColor}) => [name, coupon, color,textColor] );

    // Does it need to be uniqueized ?
    let uniqResult = [];
    for(let i = 0; i < result.length; i++){
        let contains = false;
        for(let j = 0; j < result.length; j++){
            if( uniqResult[j] && result[i][1] === uniqResult[j][1]) {
                contains = true;
                break;
            }
        }
        if(!contains) uniqResult.push(result[i])
    }

    return uniqResult;
}

export default setGameMap;
