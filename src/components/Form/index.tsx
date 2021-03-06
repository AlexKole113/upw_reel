import styles from './styles/index.css'
import {FC, FormEvent, ChangeEvent, useState, useEffect} from "react";
import isCorrectValue from "@/utils/validators/isCorrectValue";
declare const window: any;
const Form:FC<{[key:string]:any}> = ({children, action, tryAgain, appState}) => {

    const [formState,  setFormState ]    = useState({invalidValue: false, submitWasActivate: false})
    const [inputValue, setInputValue]    = useState('');
    const [showTryBtn, setShowBtn]       = useState('');

    useEffect(()=>{
         setFormState(()=>({invalidValue: false, submitWasActivate: false}));
         setShowBtn(() => '' )
    },[appState.active])

    useEffect(()=>{
        if( appState.win && appState.win[0] === 'no luck' ){
            setTimeout(()=>{
                setShowBtn(() => 'show' )
            },1500 )
        }
    },[appState.win])

    const submitHandler = (e:FormEvent) => {
        e.preventDefault();
        if( isCorrectValue( inputValue ) ){
            setFormState((prevState)=>({...prevState,submitWasActivate:true}))
            action( inputValue )
        } else {
            new Promise((res)=>{
                setFormState((prevState)=>({...prevState, invalidValue: true}))
                setTimeout(()=>{
                    res(null)
                },500)
            })
            .then(()=>{
                setFormState((prevState)=>({...prevState, invalidValue: false}))
            })

        }
    }

    const typeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        if(formState.invalidValue)  setFormState((prevState)=>({...prevState, invalidValue: false}))
        setInputValue(e.target.value)
    }

    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <input onChange={typeHandler}
                   className={`${styles.input} ${ ( formState.invalidValue ) ? styles.invalid : '' }`}
                   placeholder="Email Address"
                   type="email"
                   value={inputValue}
            />

            <div style={{backgroundImage:`url(${window.EMBED_REEL_PATH}/assets/reel-frame.png)`}} className={styles.mainComponent}>
                { children }
            </div>

            {
                ( !formState.submitWasActivate ) ? <input className={styles.button} type="submit" value="PLAY" /> : ''
            }
            {
                ( appState.win && appState.win[0] === 'no luck' && showTryBtn && appState.attempts > 0 ) ? <a className={styles.button} onClick={(e)=>{e.preventDefault(); tryAgain(); setShowBtn(() => '' ) }} href={`#`}>{`Try again! You have ${appState.attempts} attempts`}</a> : ''
            }
            {
                ( appState.win && appState.win[0] === 'no luck' && showTryBtn && appState.attempts === 0 ) ? <span className={styles.allNoLuck}>No luck this time :( Please try again later</span> : ''
            }
            {
                ( formState.submitWasActivate && !showTryBtn ) ? <span className={styles.fakeButton}>spinning...</span> : ''
            }


        </form>
    )
}
export default Form;
