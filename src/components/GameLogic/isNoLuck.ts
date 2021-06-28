const isNoLuck = ( noLuckPercentage:number ) => (Math.random() > ( 1 - noLuckPercentage ) );
export default isNoLuck;
