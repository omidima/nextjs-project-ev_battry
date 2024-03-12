import { Flex } from "@radix-ui/themes"
import s from "./index.module.scss"
import Link from "next/link"
import { Logout, Person } from "@mui/icons-material"
import { clearCookies } from "@/utils/cookie_helper"

export default function DashboardAppbar() {
    const isDesktop = window.innerWidth > 900

    return <div>
        <Flex justify={"between"} align={"center"} className={isDesktop ? undefined : s.fixed_top}>
            <Link href={"/dashboard/profile"} className={s.button}>
                <Person /> <span> My Account</span>
            </Link>
            <div className={s.h_line} />
            <div onClick={() => {
                localStorage.clear()
                clearCookies()
                location.replace("/signin")
            }} className={s.button}>
                <Logout fontSize={"small"} /><span>Log Out</span>
            </div>
        </Flex>
        <hr />
    </div>
}