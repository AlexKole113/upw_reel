declare const window: any;
class API {

    static getGameData = ( gameId: string|null  = 'sampleId', method = 'GET' ) :Promise<{settings:any,[key:string]:any}> => {
        console.log(gameId,method)
        return new Promise((res)=>{
            setTimeout(()=>{
                res(window.REEL_MAP)
            },500)
        })
    }

    static sendImpression = ( gameId:string|null, method:string = 'POST' ) => {
        console.log(gameId,method)
        if( !gameId ) {
            throw new Error('no gameId for sendImpression')
        }
        return new Promise((res)=> {
            setTimeout(() => {
                res('ok');
            }, 200);
        });
    }

    static sendLead = ( gameId:string|null, email:string, method:string = 'POST' ) => {
        console.log(gameId,method,email)
        if( !gameId ) {
            throw new Error('no gameId for sendLead')
        }
        return new Promise((res)=>{
            setTimeout(()=>{
                res('ok')
            },200)
        })
    }

}

export default API;
