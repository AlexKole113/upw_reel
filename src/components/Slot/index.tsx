import styles from './styles/index.css'


//asets collection
import image5off from '../../../assets/5.png';
import image25off from '../../../assets/25.png';
import imageFreeShipment from '../../../assets/free.png';



const Slot = ({type}:{type:string}) => {

    const typesMap = new Map ([
        ['5%', image5off],
        ['25%', image25off],
        ['free shipment', imageFreeShipment],
    ])


    return(
        <div className={styles.slot}>
            <img src={typesMap.get(type)} alt="" />
        </div>
    )
}
export default Slot;
