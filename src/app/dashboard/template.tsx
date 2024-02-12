import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getGetVehicles } from "@/faetures/dashboard/apis/vehicle";
import { VehicleDto } from "@/faetures/dashboard/types/vehicle.dto";
import DashboardTemplate from "@/faetures/dashboard/components/DashboardTemplate";
import { getCurrentUser } from "@/faetures/auth/apis/auth";


async function getData() {
    const response = await getGetVehicles()
    return response.data
}


export default async function Template({ children }: { children: React.ReactNode }) {

    // @TODO: convert to ssr in production version
    // const [data, setData] = useState<null | VehicleDto[]>(null)
    const data = await getData()

    // @TODO: remove in production version
    // const [loading, setLoading] = useState<boolean>(true)

    // useEffect(() => {
    //     // @TODO: remove in production build
    //     setLoading(true)
    //     getCurrentUser().then((r) => {
    //         if (r.getUsername()) {
    //             getData().then(r => setData(r))
    //         } else {
    //             location.replace("/signup")
    //         }

    //         setLoading(false)
    //     })

    // }, [])

    return <>
        <Box>
            <Grid container>
                <DashboardTemplate items={data ?? []}>
                    {/* {loading ? <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)"
                    }}><CircularProgress /></div> : children} */}
                    {children}
                </DashboardTemplate>
            </Grid>
        </Box>
    </>
}