import ReelItem from "@/components/ReelItem";
import styles from './styles/index.css'



const ReelGroup = ({win,slots}:{win:string|null,slots:string[]}) => {

    const winsMap = new Map([]);
    slots.forEach(( item, number) => {
        winsMap.set( item, 100 - ( (100/ (slots.length * 3) ) * ( number + 1 ) ) )
    })


    const translateTo = ( win ) ? winsMap.get( win ) : 0;

    return (
        <div className={styles.reelGroup}>
            <ReelItem slots={slots} translateTo={ ( typeof translateTo === 'number' ) ? translateTo : 0 } delay={0} />
            <ReelItem slots={slots} translateTo={ ( typeof translateTo === 'number' ) ? translateTo : 0 } delay={2} />
            <ReelItem slots={slots} translateTo={ ( typeof translateTo === 'number' ) ? translateTo : 0 } delay={4} />
        </div>
    )
}

export default ReelGroup;
