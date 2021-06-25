import ReelItemSlotsGroup from "@/components/ReelItemSlotsGroup";

import styles from './styles/index.css'

const ReelItem = ({slots, translateTo, delay }:{slots:string[], translateTo: number, delay:number}) => {

    // cubic-bezier(1, 1.39, 0.82, 0.9)
    return(
        <div className={styles.slot}>
            <div style={{transform: `translateY(${translateTo}%)`, transition: `transform .8s .${delay}s cubic-bezier(1, 1.36, 0.85, 0.93)` }} className={styles.reelItem}>
                <ReelItemSlotsGroup slots={slots} />
                <ReelItemSlotsGroup slots={slots} />
                <ReelItemSlotsGroup slots={slots} />
            </div>
        </div>
    )
}

export default ReelItem;
