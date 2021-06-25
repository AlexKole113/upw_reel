class API {

    static HOST = `https://us-central1-gindoracapture.cloudfunctions.net/acc_api/api/`;
    static SUBMISSIONS = API.HOST + `submissions`;
    static EMBED       = API.HOST + `embed`;

    static getGameData = ( gameId: string|null  = 'sampleId', method = 'GET' ) => {
        console.log('start fetch -')
        return fetch( API.EMBED + `/${gameId}` , {
            method: method,
            credentials: 'omit',
        })
    }

    static sendImpression = ( gameId:string|null, method:string = 'POST' ) => {
        if( !gameId ) {
            throw new Error('no gameId for sendImpression')
        }
        return fetch( API.SUBMISSIONS , {
            method: method,
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId,
                type: "impression"
            })
        })
    }

    static sendLead = ( gameId:string|null, email:string, method:string = 'POST' ) => {
        if( !gameId ) {
            throw new Error('no gameId for sendLead')
        }
        return fetch( API.SUBMISSIONS , {
            method: method,
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId,
                type: "lead",
                email
            })
        })
    }

    checkEmail = () => {
        //TODO: Need check ??
    }

}

export default API;
