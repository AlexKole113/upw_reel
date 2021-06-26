import styles from './styles/index.css'

const Slot = ({type}:{type:string}) => {

    const typesMap = new Map ([
        ['5%',  <div className={styles.label} style={{background:'#51b1e9'}}><span>5%</span></div>],
        ['10%', <div className={styles.label} style={{background:'#ef813b'}}><span>10%</span></div>],
        ['15%', <div className={styles.label} style={{background:'#db302d'}}><span>15%</span></div>],
        ['10$', <div className={styles.label} style={{background:'#ff00dd'}}><span>10$</span></div>],
    ])

    if( type === 'no luck' ) return null;
    return(
        <div className={styles.slot}>
            {typesMap.get(type)}
        </div>
    )
}
export default Slot;
