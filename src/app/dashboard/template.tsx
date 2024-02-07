import { Box, Grid } from "@mui/material";
import React from "react";
import s from "./dashboard.module.scss";
import Image from "next/image";
import VehicleButton from "@/faetures/dashboard/components/VehicleButton";
import { SiMercedes, SiTesla } from "react-icons/si";
import { BiPlus } from "react-icons/bi";
import { getGetVehicles } from "@/faetures/dashboard/apis/vehicle";
import { VehicleDto } from "@/faetures/dashboard/types/vehicle.dto";
import VehicleItems from "@/faetures/dashboard/components/DashboardTemplate/VehicleItems";
import DashboardTemplate from "@/faetures/dashboard/components/DashboardTemplate";


async function getData() {
    const response = await getGetVehicles()
    return response.data
}


export default async function Template({ children }: { children: React.ReactNode }) {
    const data = await getData()

    return <>
        <Box>
            <Grid container>
                <DashboardTemplate items={data}>
                    {children}
                </DashboardTemplate>
            </Grid>
        </Box>
    </>
}