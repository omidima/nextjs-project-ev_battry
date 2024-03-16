"use client"

import { Grid, LinearProgress, Theme, linearProgressClasses, styled } from "@mui/material"
import s from "./index.module.scss";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar_context";
import Image from "next/image";
import emptyLogo from "../../../../../public/not-selected.svg"
import { Flex } from "@radix-ui/themes";
import Chart from "../Chart";
import DashboardAppbar from "../DashboardAppbar";


const BorderLinearProgress = styled(LinearProgress)(({ theme, aria }: { theme?: Theme, aria: "green" | "dark" }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: aria === "dark" ? "#FFFFFF33" : "white",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,

        backgroundColor: aria === "dark" ? 'white' : "black",
    },
}));

export default function DashboardStatusCard() {
    const vehicle = useContext(SidebarContext)
    const isDesktop = window.innerWidth > 900

    return <>
        {isDesktop ? null : <DashboardAppbar />}
        {vehicle.active ? <div className={s.body}>
            <Grid container spacing={2} rowSpacing={2} padding={2} className={isDesktop ? undefined : "mt-6"}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                    <div className={`${s.card} ${s.green}`} style={{ background: "#ACF5B0" }}>
                        <h3>Nominal battery capacity</h3>
                        <p>The total energy storage capacity of the battery pack when it's brand new and in optimal conditions.</p>
                        <Flex align={"end"} gap={"2"}>
                            <div><h1 className="text-start">{vehicle.active?.battery_capacity_nominal_kwh ?? "Unknown"}</h1></div>
                            <div><p>kWh</p></div>
                        </Flex>
                    </div>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                    <div className={`${s.card} ${s.green}`} style={{ background: "#ACF5B0" }}>
                        <h3>Usable battery capacity</h3>
                        <p>The portion of the nominal capacity that is actually available for use.</p>
                        <Flex align={"end"} gap={"2"}>
                            <div><h1 className="text-start">{vehicle.active?.battery_capacity_usable_kwh ?? "Unknown"}</h1></div>
                            <div><p>kWh</p></div>
                        </Flex>

                    </div>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} >
                    <div className={`${s.card} ${s.dark}`} style={{ background: "#1940CB" }}>
                        <h3>Remaining battery warranty (months)</h3>
                        <Flex align={"end"} gap={"4"}>
                            <div><h1 className="text-start">{vehicle.active?.battery_remaining_warranty_months ?? "Unknown"} months </h1> </div>
                            <div><p>/ {vehicle.active.battery_warranty_months ?? "Unknown"} months</p></div>
                        </Flex>
                        <BorderLinearProgress aria="dark" variant="determinate" value={Number(vehicle.active?.battery_remaining_warranty_months ?? 0) * 100 / Number(vehicle.active.battery_warranty_months ?? 0)} />
                    </div>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <div className={`${s.card} ${s.dark}`} style={{ background: "#1940CB" }}>
                        <h3>Remaining battery warranty (miles)</h3>
                        <Flex align={"end"} gap={"4"}>
                            <div><h1 className="text-start">{vehicle.active?.battery_remaining_warranty_miles?.toLocaleString() ?? "Unknown"} miles </h1> </div>
                            <div><p>/ {vehicle.active?.battery_warranty_miles?.toLocaleString() ?? "Unknown"} miles</p></div>
                        </Flex>
                        <BorderLinearProgress aria="dark" variant="determinate" value={Number(vehicle.active?.battery_remaining_warranty_miles ?? 0) * 100 / Number(vehicle.active?.battery_warranty_miles ?? 0)} />
                    </div>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <div className={`${s.card} ${s.simple}`}>
                        <h3>Real maximum range</h3>
                        <p>The estimated maximum distance the vehicle can travel on a full charge compared to the WLTP published value.</p>
                        <Chart title="miles" value={Number(vehicle.active.real_combined_max_range_miles ?? 0)} max={Number(vehicle.active.wltp_range_miles)} />
                        <p className={s.desc}>Based on combined city and motorway driving in mild weather (23 degC) and no use of A/C. The actual range will depend on speed, style of driving, weather and route conditions</p>
                    </div>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} paddingBottom={10}>
                    <div className={`${s.card} ${s.simple}`}>
                        <h3>Real battery efficiency</h3>
                        <p>The energy consumption of the vehicle measured in miles per kilowatt hour compared to the WLTP published value.</p>
                        <Chart title="mi/kWh" value={Number(vehicle.active.real_battery_efficiency_mi_per_kwh ?? 0)} max={Number(vehicle.active.wltp_efficiency_mi_per_kwh)} />
                        <p className={s.desc}>Based on combined city and motorway driving in mild weather (23 degC) and no use of A/C. The actual range will depend on speed, style of driving, weather and route conditions</p>
                    </div>
                </Grid>
            </Grid>
        </div> : <div className={s.empty}>
            <Image src={emptyLogo} alt="" />
        </div>}

    </>
}