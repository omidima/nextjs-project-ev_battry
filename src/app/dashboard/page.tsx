"use client"

import s from "./dashboard.module.scss"
import PageDesktopView from "./components/DesktopView";
import PageMobileView from "./components/MobileView";
import { isDesktop } from "@/utils/helper/sizing";

export default function Page() {
    return <div className={s.container}>
        {isDesktop() ? <PageDesktopView /> : <PageMobileView />}
    </div>
}