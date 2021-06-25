import ReelItem from "@/components/ReelItem";
import styles from './styles/index.css'



const ReelGroup = ({win,slots}:{win:string|null,slots:string[]}) => {

    const calculateTranslate     = (number:number) =>  100 - ( (100 / (slots.length * 3) ) * ( number + 1 ) );
    const calculateStartPosition = (number:number) => (100 / (slots.length * 3) ) * number;

    const winsMap = new Map([]);
    slots.forEach(( item, number) => {
        winsMap.set( item, calculateTranslate( number ) )
    })


    return (
        <div className={styles.reelGroup}>
            <ReelItem slots={slots} translateTo={ ( win ) ? winsMap.get( win ) : calculateStartPosition(0)} delay={0} />
            <ReelItem slots={slots} translateTo={ ( win ) ? winsMap.get( win ) : calculateStartPosition(1)} delay={2} />
            <ReelItem slots={slots} translateTo={ ( win ) ? winsMap.get( win ) : calculateStartPosition(2)} delay={4} />
        </div>
    )
}

export default ReelGroup;
