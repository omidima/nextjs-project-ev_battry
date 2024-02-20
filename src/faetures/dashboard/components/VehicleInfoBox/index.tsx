"use client"
import { useContext } from "react";
import SidebarContextProvider, { SidebarContext, useSidebarContext } from "../../contexts/sidebar_context";
import s from "./index.module.scss"
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import vehicleImage from "../../../../../public/vecale-logo.svg"
import { Logout, Person } from "@mui/icons-material";
import { clearCookies } from "@/utils/cookie_helper";

export default function VehicleInfoBox() {
    const vehicle = useContext(SidebarContext)

    return vehicle.active ? <div className={s.container}>
        <Flex justify={"between"} align={"center"}>
            <div className={s.button}>
                <Person /> <span> My Account</span>
            </div>
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
        <div className="">
            <Flex className={s.title_box} align={"center"} gap={"4"}>
                <Image src={vehicleImage} alt="" />
                <div className="">
                    <p>Tesla</p>
                    <Flex>
                        <span>{vehicle.active?.model}</span>
                        <div className={s.h_line} />
                        <span>{vehicle.active?.year}</span>
                        <div className={s.h_line} />
                        <span>{vehicle.active?.mileage} mi</span>
                    </Flex>
                </div>

            </Flex>
            <Image className={s.car_image} src={vehicle.active?.image_url!} alt="" width={512} height={512} />
        </div>
    </div> : <></>
}