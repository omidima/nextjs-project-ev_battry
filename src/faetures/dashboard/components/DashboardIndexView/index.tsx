"use client"

import { Grid, LinearProgress, Theme, linearProgressClasses, styled } from "@mui/material"
import s from "./index.module.scss";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar_context";
import Image from "next/image";
import emptyLogo from "../../../../../public/not-selected.svg"
import { Flex } from "@radix-ui/themes";


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

    return <>
        {vehicle.active ? <Grid container spacing={2} rowSpacing={2} padding={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                <div className={`${s.card} ${s.simple}`}>
                    <h3>Nominal Battery Capacity</h3>
                    <p>The total energy storage capacity of the battery pack when it's brand new and in optimal conditions.</p>
                    <Flex align={"end"} gap={"2"}>
                        <div><h2>{vehicle.active?.nominal}</h2></div>
                        <div><p>KWh</p></div>
                    </Flex>
                </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                <div className={`${s.card} ${s.blue}`}>
                    <h3>Usable Battery Capacity</h3>
                    <p>The portion of the nominal capacity that is actually available for use.</p>
                    <Flex align={"end"} gap={"2"}>
                        <div><h2>{vehicle.active?.battry_capacity}</h2></div>
                        <div><p>KWh</p></div>
                    </Flex>

                </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                <div className={`${s.card} ${s.dark}`}>
                    <h3>Remaining Warranty (Months)</h3>
                    <Flex align={"end"} gap={"4"}>
                        <div><h1>{vehicle.active?.remaining_warrant_month} years </h1> </div>
                        <div><p>/ 8 Years</p></div>
                    </Flex>
                    <BorderLinearProgress aria="dark" variant="determinate" value={(vehicle.active?.remaining_warrant_month ?? 0) * 100 / 8} />
                </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} paddingBottom={10}>
                <div className={`${s.card} ${s.green}`}>
                    <h3>Remaining Warranty (Miles)</h3>
                    <Flex align={"end"} gap={"4"}>
                        <div><h1>{vehicle.active?.remaining_warrant?.toLocaleString("en-US")} miles </h1> </div>
                        <div><p>/ 100,000 miles</p></div>
                    </Flex>
                    <BorderLinearProgress aria="green" variant="determinate" value={(vehicle.active?.remaining_warrant ?? 0) * 100 / 100000} />
                </div>
            </Grid>
        </Grid> : <div className={s.empty}>
            <Image src={emptyLogo} alt="" />
        </div>}

    </>
}