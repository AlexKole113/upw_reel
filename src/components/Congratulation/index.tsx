import {useEffect, useState} from "react";
import styles from './styles/index.css'

const Congratulation = ({text,action}:{text:string,action:()=>void}) => {

    const [show,setShow] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
            setShow(()=> styles.show)
        },0)

    },[])

    return(

        <div className={`${styles.congratulation} ${show}`}>
            <h3 className={styles.title}>You Win: {text} </h3>
            <div className={styles.promoCodeBlock}>
                <p className={styles.promocodeTitle}>Your code:</p>
                <p className={styles.promocodeName}>#some Code</p>
            </div>
            <div className={styles.btnBlock}>
                <a onClick={(e)=>{e.preventDefault(); action()}} className={styles.button} href={'#'}>to the shop</a>
            </div>
        </div>
    )
}
export default Congratulation;
