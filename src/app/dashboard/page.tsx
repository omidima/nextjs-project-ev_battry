"use cilent"

import DashboardStatusCard from "@/faetures/dashboard/components/DashboardIndexView";

export default function Page() {
    return <div style={{
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0,
    }}>
            <DashboardStatusCard />
    </div>
}