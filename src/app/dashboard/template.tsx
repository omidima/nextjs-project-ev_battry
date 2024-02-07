"use client"

import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getGetVehicles } from "@/faetures/dashboard/apis/vehicle";
import { VehicleDto } from "@/faetures/dashboard/types/vehicle.dto";
import DashboardTemplate from "@/faetures/dashboard/components/DashboardTemplate";


async function getData() {
    const response = await getGetVehicles()
    return response.data
}


export default function Template({ children }: { children: React.ReactNode }) {

    // @TODO: convert to ssr in production version
    const [data, setData] = useState<null | VehicleDto[]>(null)

    useEffect(() => {
        getData().then(r => setData(r))
    },[])

    return <>
        <Box>
            <Grid container>
                <DashboardTemplate items={data ?? []}>
                    {children}
                </DashboardTemplate>
            </Grid>
        </Box>
    </>
}