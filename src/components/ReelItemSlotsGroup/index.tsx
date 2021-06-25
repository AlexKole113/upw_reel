import Slot from "@/components/Slot";


const ReelItemSlotsGroup = ({slots}:{slots:string[]}) => {

    const slotsCollection = slots.map(( item,num ) => <Slot key={num} type={item}  />)
    return (
        <div>
            {slotsCollection}
        </div>
    )
}

export default ReelItemSlotsGroup;
