import DashboardStatusCard from "@/faetures/dashboard/components/DashboardIndexView";
import VehicleInfoBox from "@/faetures/dashboard/components/VehicleInfoBox";
import { Grid } from "@mui/material";
import s from "../dashboard.module.scss"

export default function PageDesktopView() {
    return <Grid container>
        <Grid item xl={8} lg={8} md={6} sm={12} xs={12} className={s.content}>
            <DashboardStatusCard />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <VehicleInfoBox />
        </Grid>
    </Grid>
}