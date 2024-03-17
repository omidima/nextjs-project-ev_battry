import s from "./index.module.scss"
import DashboardAppbar from "../DashboardAppbar";
import VehicleInfoBoxContent from "./VehicleInfoBoxContent";
import VehicleInfoBoxFooter from "./VehicleInfoBoxFooter";

export default function VehicleInfoBox() {

    return <>
        <div className={s.container}>
            <DashboardAppbar />
            <VehicleInfoBoxContent />
            <VehicleInfoBoxFooter />
        </div>
    </>
}