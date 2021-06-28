import styles from './styles/index.css'

const Slot = ({item}:{item:string[]}) => (
        <div className={styles.slot}>
            <span style={{background: (item[2] ?? 'red'),color:(item[3] ?? '#fff')}} className={styles.label}> {item[0]} </span>
        </div>
)

export default Slot;
