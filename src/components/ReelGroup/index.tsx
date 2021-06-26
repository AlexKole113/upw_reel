import ReelItem from "@/components/ReelItem";
import getUniqueRandomSlot from "@/components/GameLogic/getUniqueRandomSlot";
import styles from './styles/index.css'



const ReelGroup = ({ winLabel, slots }:{winPromoCode?:string|null, winLabel:string|null, slots:string[][]}) => {

    const winsMap:Map<string, number[]>   = new Map([]);
    const calculateTranslate              = (number:number) =>  100 - ( (100 / (slots.length * 3) ) * ( number + 1 ) );
    const calculateStartPosition          = (number:number) => (100 / (slots.length * 3) ) * number;
    const getRandomSlot                   = () => Math.round(Math.random() * (slots.length - 1) )

    slots.forEach(( [item], number) => {
        if( winLabel === 'no luck' ){
            const randomSlot = getRandomSlot();
            winsMap.set( 'no luck', [ calculateTranslate( randomSlot ) , calculateTranslate( getUniqueRandomSlot(randomSlot,slots.length - 1) ) , calculateTranslate( getUniqueRandomSlot(randomSlot,slots.length - 1)  ) ])
        } else {
            winsMap.set( item, [calculateTranslate( number ) , calculateTranslate( number ) , calculateTranslate( number )])
        }
    })


    return (
        <div className={styles.reelGroup}>
            <ReelItem slots={slots} translateTo={ ( winLabel ) ? winsMap.get( winLabel )![0] : calculateStartPosition(0)} delay={0} />
            <ReelItem slots={slots} translateTo={ ( winLabel ) ? winsMap.get( winLabel )![1] : calculateStartPosition(1)} delay={2} />
            <ReelItem slots={slots} translateTo={ ( winLabel ) ? winsMap.get( winLabel )![2] : calculateStartPosition(2)} delay={4} />
        </div>
    )
}

export default ReelGroup;
