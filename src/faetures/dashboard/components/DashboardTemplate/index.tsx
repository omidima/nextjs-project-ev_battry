"use client"

import { Grid } from "@mui/material"
import SidebarContextProvider, { useSidebarContext } from "../../contexts/sidebar_context"
import { VehicleDto } from "../../types/vehicle.dto"
import Image from "next/image"
import VehicleItems from "./VehicleItems"
import s from "./index.module.scss"
import { ReactNode } from "react"
import logo from "./../../../../../public/min-logo.svg"

export default function DashboardTemplate(props: { items: VehicleDto[], children: ReactNode }) {
    const hook = useSidebarContext()
    return <SidebarContextProvider hook={hook}>
        <Grid xl={1} lg={1} md={2} sm={3} xs={2} className={s.sidebar}>
            <div className={s.logo}>
                <Image src={logo} alt="" />
            </div>
            <div className={s.contents}>
                <VehicleItems items={props.items} onChange={function (item: VehicleDto): void {
                    hook.changeActive(item)
                }} />
            </div>
        </Grid>
        <Grid xl={11} lg={11} md={10} sm={9} xs={10} className={s.bg}>{props.children}</Grid>
    </SidebarContextProvider>
}