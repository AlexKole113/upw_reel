import CloseButton from "@/components/CloseButton";
import Form from "@/components/Form";
import ReelGroup from "@/components/ReelGroup";
import {useEffect, useState} from "react";
import Congratulation from "@/components/Congratulation";

import styles from '../styles/index.css'
import CongratulationBackground from "@/components/CongratulationBackground";

export default ({ gameID }:{ gameID:string }) => {
    const slots                   = ['5%','25%','free shipment'];
    const initialState            = {gameID, active:false, gameWasStart: false, win: null, emailWasSent:false, loading: false, error: false, success:false }
    const [appState, setAppState] = useState<{[key:string]:any}>( initialState )
    const [message, setMessage]   = useState<{[key:string]:null|string}>({congratulation: null, tryAgain: null});

    const popUpStarter = ( e:MouseEvent ) => {
        if ( e.relatedTarget === null ) setAppState((prevState)=>({...prevState, active: true}))
    }


    useEffect(() => {
        //TODO: getGame data ? if ok addEventListener
        window.addEventListener('mouseout', popUpStarter )
        return(
            () => {
                window.removeEventListener('mouseout', popUpStarter );
            }
        )
    },[]);

    useEffect(()=>{
        if( appState.active ){
            //TODO: Send Impression
            document.querySelector('html')?.classList.add(styles.overflowHidden)
        } else {
            document.querySelector('html')?.classList.remove(styles.overflowHidden)
        }

    },[appState.active])

    useEffect(()=>{
        if( appState.gameWasStart ){
         const randomIndex  =  Math.round(Math.random() * (slots.length - 1) );
         const win          = slots[ randomIndex ];
         setAppState((prevState)=>({...prevState, gameWasStart: false, win }));
         setTimeout(()=>{
             setMessage(()=>({
                 tryAgain: null,
                 congratulation: win
             }))
         },1500)
        }
    },[appState.gameWasStart])

    const sendEmailAndStartGame = (value:string) => {
        if( appState.win !== null ) return;
        setAppState((prevState) =>({...prevState, loading:true }))

        //TODO Sent Lead if OK then dispatch gameWasStart

        setTimeout(()=>{
            console.log(value)
            setAppState((prevState) =>({...prevState, gameWasStart: true }))
        },10)



    }
    const closeAndReset = () =>{
        setAppState(()=> ({...initialState}))
        setMessage(()=>({congratulation: null, tryAgain: null}))
    }
    const setEmailWasSent = () => {
        setAppState((prevState)=>({...prevState, emailWasSent:true}));
    }

    if( appState.emailWasSent ) return null;
    return (
        <section className={`${styles.reel} ${ !appState.active ? styles.dnone : '' } ` }>
            <div className={styles.container}>

                <CloseButton action={closeAndReset} />

                { !message.congratulation ? (
                    <div>
                        <div className={styles.cta}> Enter your email address to find out if your’re the winner! </div>
                        <Form action={ sendEmailAndStartGame } >
                            <ReelGroup win={appState.win} slots={slots} />
                        </Form>
                    </div>
                ) : <><CongratulationBackground /><Congratulation text={message.congratulation} action={setEmailWasSent} /></> }


            </div>
        </section>
    )
}
