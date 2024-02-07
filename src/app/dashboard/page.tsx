import { Box, Container, Grid } from "@mui/material";
import s from "./dashboard.module.scss";
import DashboardStatusCard from "@/faetures/dashboard/components/DashboardIndexView";

export default function Page() {
    return <>
        <Box width={"100%"}>
            <DashboardStatusCard />
        </Box>
    </>
}