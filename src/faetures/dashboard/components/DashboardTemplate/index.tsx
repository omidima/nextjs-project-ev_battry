"use client"

import { Grid } from "@mui/material"
import SidebarContextProvider, { useSidebarContext } from "../../contexts/sidebar_context"
import { VehicleDto } from "../../types/vehicle.dto"
import Image from "next/image"
import VehicleItems from "./VehicleItems"
import s from "./index.module.scss"
import { ReactNode } from "react"
import logo from "./../../../../../public/min-logo.svg"
import { getCurrentUser } from "@/faetures/auth/apis/auth"
import { connectNewVehicle } from "../../apis/vehicle"
import { Logout } from "@mui/icons-material"
import { clearCookies } from "@/utils/cookie_helper"
import { Button } from "@radix-ui/themes"

export default function DashboardTemplate(props: { items: VehicleDto[], children: ReactNode }) {
    const hook = useSidebarContext()
    return <SidebarContextProvider hook={hook}>
        <Grid item xl={1} lg={1} md={2} sm={3} xs={2} className={s.sidebar}>
            <div className={s.logo}>
                <Image src={logo} alt="" />
            </div>
            {props.items.length < 1 ? <Button onClick={() => {
                localStorage.clear()
                clearCookies()
                location.replace("/signin")
            }} variant="soft" color="red">
                <Logout fontSize={"small"} /><span>Log Out</span>
            </Button>  :null}
            <div className={s.contents}>
                <VehicleItems
                    onAddItemClick={async () => {
                        const user = await getCurrentUser()
                        connectNewVehicle(user.attributes.connect_ui_url)
                    }}
                    items={props.items.map((item, index) => { return { ...item, id: index } })}
                    onChange={function (item: VehicleDto): void {
                        hook.changeActive(item)
                    }} />
            </div>
        </Grid>
        <Grid item xl={11} lg={11} md={10} sm={9} xs={10} className={s.bg}>{props.children}</Grid>
    </SidebarContextProvider>
}