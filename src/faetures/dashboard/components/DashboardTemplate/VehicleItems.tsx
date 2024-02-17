"use client"

import { useContext } from "react"
import { SidebarContext } from "../../contexts/sidebar_context"
import { VehicleDto } from "../../types/vehicle.dto"
import VehicleButton from "../VehicleButton"

export default function VehicleItems(props: { 
    items: VehicleDto[], 
    onChange: (item: VehicleDto) => void ,
    onAddItemClick: () => void ,
}) {
    const vehicle = useContext(SidebarContext)

    return <>
        {props.items.map(item => <VehicleButton key={item.id} item={item} type={"item"} onSelect={() => { props.onChange(item) }} isActive={item.id === vehicle.active?.id} />)}

        {/* Add button */}
        <VehicleButton key={"add"} item={{
            name: "Add vehicle",
            brand: "add"
        }} type={"default"} onSelect={async () => {
            props.onAddItemClick()
            
        }}/>
    </>
}