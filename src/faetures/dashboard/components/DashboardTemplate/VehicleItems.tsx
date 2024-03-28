"use client"

import { useContext, useEffect } from "react"
import { SidebarContext, useSidebarContext } from "../../contexts/sidebar_context"
import { VehicleDto } from "../../types/vehicle.dto"
import VehicleButton from "../VehicleButton"

export default function VehicleItems(props: {
    items: VehicleDto[],
    onChange: (item: VehicleDto) => void,
    onAddItemClick: () => void,
}) {
    const vehicle = useContext(SidebarContext)

    useEffect(() => {
        props.onChange(props.items.reverse()[0])
    }, [props.items.length])

    return <>
        {props.items.map((item, index) => <VehicleButton key={index} item={item} type={"item"} onSelect={() => { props.onChange(item) }} isActive={item.vehicle_id === vehicle.active?.vehicle_id} />)}

        {/* Add button */}
        <VehicleButton key={"add"} item={{
            model: "Add vehicle",
            make: "add"
        }} type={"default"} onSelect={async () => {
            props.onAddItemClick()

        }} />
    </>
}