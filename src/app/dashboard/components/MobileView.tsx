import DashboardStatusCard from "@/faetures/dashboard/components/DashboardIndexView";
import { Grid } from "@mui/material";
import DashboardAppbar from "@/faetures/dashboard/components/DashboardAppbar";
import VehicleInfoBoxContent from "@/faetures/dashboard/components/VehicleInfoBox/VehicleInfoBoxContent";
import VehicleInfoBoxFooter from "@/faetures/dashboard/components/VehicleInfoBox/VehicleInfoBoxFooter";

export default function PageMobileView() {
    return <Grid container>
        <Grid item overflow={["hidden", "auto"]}>
            <DashboardAppbar />
            <div className="mt-7 p-2">
                <VehicleInfoBoxContent />
            </div>
            <DashboardStatusCard />
            <VehicleInfoBoxFooter />
        </Grid>
    </Grid>
}