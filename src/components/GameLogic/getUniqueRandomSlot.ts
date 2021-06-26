const getUniqueRandomSlot = ( oldNum:number, slotsAmount:number ) :number => {
    let newNum =  Math.round(Math.random() * slotsAmount );
    while( newNum === oldNum ){
        newNum =  Math.round(Math.random() * slotsAmount );
    }
    return newNum;
}

export default getUniqueRandomSlot;
