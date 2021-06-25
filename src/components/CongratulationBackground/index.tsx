import styles from './styles/index.css'
import {useEffect} from "react";
import Confetti from "@/components/CongratulationBackground/effects/confetti";

const CongratulationBackground = () => {

    useEffect(()=>{
        Confetti();
    },[])

    return(
        <canvas className={styles.canvas} id="confetti"></canvas>
    )
}

export default CongratulationBackground;
