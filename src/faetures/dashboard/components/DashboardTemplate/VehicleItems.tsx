"use client"

import { useContext } from "react"
import SidebarContextProvider, { SidebarContext, useSidebarContext } from "../../contexts/sidebar_context"
import { VehicleDto } from "../../types/vehicle.dto"
import VehicleButton from "../VehicleButton"
import { connectNewVehicle } from "../../apis/vehicle"
import { getCurrentUser } from "@/faetures/auth/apis/auth"

export default function VehicleItems(props: { items: VehicleDto[], onChange: (item: VehicleDto) => void }) {
    const vehicle = useContext(SidebarContext)

    return <>
        {props.items.map(item => <VehicleButton key={item.id} item={item} type={"item"} onSelect={() => { props.onChange(item) }} isActive={item.id === vehicle.active?.id} />)}
        <VehicleButton key={"add"} item={{
            name: "Add vehicle",
            brand: "add"
        }} type={"default"} onSelect={async () => {
            const user = await getCurrentUser()
            connectNewVehicle(user.id)
        }}/>
    </>
}