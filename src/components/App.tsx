import CloseButton from "@/components/CloseButton";
import Form from "@/components/Form";
import ReelGroup from "@/components/ReelGroup";
import {useCallback, useEffect, useState} from "react";
import Congratulation from "@/components/Congratulation";
import Loader from "@/components/Loader";
import CongratulationBackground from "@/components/CongratulationBackground";

import styles from '../styles/index.css'
import isNoLuck from "@/components/GameLogic/isNoLuck";

export default ({ gameID }:{ gameID:string }) => {
    const slots                   = [ ['5%','5CODE'], ['10%','10CODE'], ['15%','15CODE'] ];
    const initialState            = {gameID, active:false, attempts: 3, gameWasStart: false, win: null, emailWasSent:false, loading: false, error: false, success:false }
    const [appState, setAppState] = useState<{[key:string]:any}>( initialState )
    const [message, setMessage]   = useState<{[key:string]:null|string}>({congratulation: null });

    const popUpStarter = useCallback(( e:MouseEvent ) => {
        if ( e.relatedTarget === null && !appState.active ) setAppState((prevState)=>({...prevState, active: true}))
    },[ appState.active ])

    useEffect(() => {
        //TODO: getGame data ? if ok addEventListener
        window.addEventListener('mouseout', popUpStarter )

        if( appState.active ){
            //TODO: Send Impression
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

        if( isNoLuck() ) {
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

        //TODO Sent Lead if OK then dispatch gameWasStart

        new Promise((resolve) => {
            setAppState((prevState) =>({...prevState, loading:true }))
            setTimeout(()=>{
                console.log(value)
                setAppState((prevState) =>({...prevState, loading:false}))
                resolve(null)
            },500 )
        })
        .then(()=>{
            setTimeout(()=>{
                setAppState((prevState) =>({...prevState, gameWasStart: true }))
            },400)
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

    if( appState.emailWasSent ) return null;
    return (
        <section className={`${styles.reel} ${ !appState.active ? styles.dnone : '' } ` }>
            <div className={styles.container}>

                <CloseButton action={closeAndReset} />

                { !message.congratulation ? (
                    <div>
                        <div className={styles.cta}> Enter your email address to find out if your’re the winner! </div>
                        <Form action={ sendEmailAndStartGame } tryAgain={tryAgain} appState={appState} >
                            { appState.loading ? <Loader /> : <ReelGroup winLabel={ appState.win ? appState.win[0] : null } slots={slots} /> }
                        </Form>
                    </div>
                ) : <><CongratulationBackground /><Congratulation text={message.congratulation} promocode={ appState.win[1] } action={setEmailWasSent} /></> }


            </div>
        </section>
    )
}
