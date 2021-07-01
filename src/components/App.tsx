import CloseButton from "@/components/CloseButton";
import Form from "@/components/Form";
import ReelGroup from "@/components/ReelGroup";
import {useCallback, useEffect, useState} from "react";
import Congratulation from "@/components/Congratulation";
import CongratulationBackground from "@/components/CongratulationBackground";
import isNoLuck from "@/components/GameLogic/isNoLuck";
import setGameMap from "@/utils/setGameMap";
import API from "@/api";


import styles from '../styles/index.css'


export default ({ gameID }:{ gameID:string }) => {

    const initialState            = {gameID, active:false, attempts: 3, gameWasStart: false, win: null, emailWasSent:false, loading: false, error: false, success:false }
    const [appState, setAppState] = useState<{[key:string]:any}>( initialState )
    const [message, setMessage]   = useState<{[key:string]:null|string}>({congratulation: null });
    const [slots,setSlots]        = useState<string[][]>([])
    const popUpStarter = useCallback(( e:MouseEvent ) => {
        if ( e.relatedTarget === null && !appState.active ) setAppState((prevState)=>({...prevState, active: true}))
    },[ appState.active ])


    useEffect(() => {
        if( !slots.length) {
            // get Game data
            API.getGameData( gameID )
                .then( r => r.json() )
                .then( ({ settings }) => {
                    setSlots(() => setGameMap( settings ) );
                    window.addEventListener('mouseout', popUpStarter )
                })
                .catch( () => {
                    setAppState((prevState) => ({
                        ...prevState,
                        error: true
                    }))
                })
        } else {
            window.addEventListener('mouseout', popUpStarter );
        }
        if( appState.active ){
            // Send Impression
            if( !appState.emailWasSent && gameID ) {
                API.sendImpression(appState.gameID)
                    .catch((e)=>{
                        console.log(e)
                    })
            }
            document.querySelector('html')?.classList.add(styles.overflowHidden)
        } else {
            document.querySelector('html')?.classList.remove(styles.overflowHidden)
        }
        return(
            () => {
                window.removeEventListener('mouseout', popUpStarter );
            }
        )
    },[ appState.active ] );

    useEffect(()=>{
        if( appState.gameWasStart && appState.attempts > 0 ){
            setAppState((prevState)=>({...prevState, attempts: prevState.attempts - 1 }))

        // luck setting ;)
        if( appState.attempts > 1 && isNoLuck(.6 ) ) {
            setAppState((prevState)=>({...prevState, gameWasStart: false, win: ['no luck',''] }));
            return;
        }

         const randomIndex  = Math.round(Math.random() * (slots.length - 1) );
         const win          = slots[ randomIndex ];
         setAppState((prevState)=>({...prevState, gameWasStart: false, win }));
         setTimeout(()=>{
             setMessage(()=>({
                 congratulation:  win[0]
             }))
         },1500)
        }
    },[appState.gameWasStart])

    const sendEmailAndStartGame = (value:string) => {
        if( appState.win !== null ) return;
        if( appState.loading || appState.gameWasStart ) return;

        //Sent Lead if OK then dispatch gameWasStart
        setAppState((prevState) =>({...prevState, loading:true }))
        API.sendLead(appState.gameID, value)
            .then(()=>{
                new Promise((resolve) => {
                    setTimeout(()=>{
                        setAppState((prevState) =>({...prevState, loading:false}))
                        resolve(null)
                    },500 )
                })
                    .then(()=>{
                        setTimeout(()=>{
                            setAppState((prevState) =>({...prevState, gameWasStart: true }))
                        },400)
                    })
            })
            .catch((e)=>{
                console.log(e)
            })
    }
    const tryAgain = () => {
        if( appState.loading || appState.gameWasStart ) return;
        if( appState.attempts > 0 ) {
            new Promise((resolve) => {
                setAppState((prevState) =>({...initialState, active:true, attempts:prevState.attempts, loading:true }));
                setTimeout(()=>{
                    setAppState((prevState) =>({...prevState,loading:false }))
                    resolve(null)
                },800 )
            })
                .then(()=>{
                    setTimeout(()=>{
                        setAppState((prevState) =>({...prevState, gameWasStart: true }))
                    },400)
                })

        }
    }
    const closeAndReset = () =>{
        setAppState(() => ({...initialState}))
        setMessage(() => ({ congratulation: null }))
    }
    const setEmailWasSent = () => {
        setAppState((prevState)=>({...prevState, active:false, emailWasSent:true}));
    }

    if( appState.emailWasSent || appState.error ) return null;
    return (
        <section className={`${styles.reel} ${ !appState.active ? styles.dnone : '' } ` }>
            <div className={styles.container}>

                <CloseButton action={closeAndReset} />

                { !message.congratulation ? (
                    <div>
                        <div className={styles.cta}> Enter your email address to find out if your’re the winner! </div>
                        <Form action={ sendEmailAndStartGame } tryAgain={tryAgain} appState={appState} >
                            <ReelGroup isLoading={appState.loading} winLabel={ appState.win ? appState.win[0] : null } slots={slots} />
                        </Form>
                    </div>
                ) : <><CongratulationBackground /><Congratulation text={message.congratulation} promocode={ appState.win[1] } action={setEmailWasSent} /></> }

            </div>
        </section>
    )
}
