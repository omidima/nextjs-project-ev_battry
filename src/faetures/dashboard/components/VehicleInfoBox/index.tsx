"use client"
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar_context";
import s from "./index.module.scss"
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import vehicleImage from "../../../../../public/vecale-logo.svg"
import { Logout, Person } from "@mui/icons-material";
import { clearCookies } from "@/utils/cookie_helper";
import { AiOutlineDisconnect } from "react-icons/ai";
import Link from "next/link";
import parseSdk from "@/core/network/parse";

export default function VehicleInfoBox() {
    const vehicle = useContext(SidebarContext)

    return vehicle.active ? <div className={s.container}>
        <Flex justify={"between"} align={"center"}>
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
            <p className="m-3 text-justify">You will receive battery health reports once we have collected enough charging data.</p>
            <button className={s.di_button} onClick={async () => {
                const param = {
                    vehicleId: vehicle.active?.id
                }

                const response = await parseSdk.Cloud.run("disconnect_vehicle", param)
                location.reload()
            }}>Disconnect <AiOutlineDisconnect /></button>
        </div>
    </div> : <div className={s.container}>
        <Flex justify={"between"} align={"center"}>
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
        <div className="">
        </div>
    </div>
}