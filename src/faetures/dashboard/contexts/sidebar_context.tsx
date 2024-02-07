"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import { VehicleDto } from "../types/vehicle.dto";

interface Props {
    active: VehicleDto | null
}

export const SidebarContext = createContext<Props>({
    active: null
})

export function useSidebarContext() {
    const [active, changeActive] = useState<VehicleDto | null>(null)

    return { active, changeActive }
}

export default function SidebarContextProvider(props: { children: ReactNode, hook: any }) {

    return <SidebarContext.Provider value={{ active: props.hook.active }}>
        {props.children}
    </SidebarContext.Provider>
}