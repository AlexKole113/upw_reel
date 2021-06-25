import styles from './styles/index.css'
import {FC, FormEvent, ChangeEvent, useState} from "react";
import isCorrectValue from "@/utils/validators/isCorrectValue";

const Form:FC<{[key:string]:any}> = ({children, action}) => {

    const [formState,  setFormState ] = useState({invalidValue: false})
    const [inputValue, setInputValue] = useState('');

    const submitHandler = (e:FormEvent) => {
        e.preventDefault();
        if( isCorrectValue( inputValue ) ){
            action(inputValue)
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
                   type="text"
                   value={inputValue}
            />

            <div className={styles.mainComponent}>
                { children }
            </div>

            <input className={styles.button} type="submit" value="PLAY" />

        </form>
    )
}
export default Form;
