"use client"

import { useContext } from "react"
import { SidebarContext } from "../../contexts/sidebar_context"
import { VehicleDto } from "../../types/vehicle.dto"
import VehicleButton from "../VehicleButton"

export default function VehicleItems(props: {
    items: VehicleDto[],
    onChange: (item: VehicleDto) => void,
    onAddItemClick: () => void,
}) {
    const vehicle = useContext(SidebarContext)

    return <>
        {props.items.map((item, index) => <VehicleButton key={index} item={item} type={"item"} onSelect={() => { props.onChange(item) }} isActive={index === vehicle.active?.id} />)}

        {/* Add button */}
        <VehicleButton key={"add"} item={{
            model:"Add vehicle",
            make:  "add"
        }} type={"default"} onSelect={async () => {
            props.onAddItemClick()

        }} />
    </>
}