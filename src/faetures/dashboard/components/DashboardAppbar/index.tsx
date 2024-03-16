import { Flex } from "@radix-ui/themes"
import s from "./index.module.scss"
import Link from "next/link"
import { Logout, Person } from "@mui/icons-material"
import { clearCookies } from "@/utils/cookie_helper"
import Image from "next/image"

import logo from "../../../../../public/p_logo.svg"

export default function DashboardAppbar() {
    const isDesktop = window.innerWidth > 900

    return <div className={isDesktop ? undefined : s.fixed_top}> 
        <Flex justify={"center"}><Image alt="" src={logo} width={200}/></Flex>
        <Flex justify={"between"} align={"center"} >
            <Link href={"/dashboard/profile"} className={s.button}>
                <Person /> <span>My account</span>
            </Link>
            <div className={s.h_line} />
            <div onClick={() => {
                localStorage.clear()
                clearCookies()
                location.replace("/signin")
            }} className={s.button}>
                <Logout fontSize={"small"} /><span>Log out</span>
            </div>
        </Flex>
        <hr />
    </div>
}