"use client"
import { useContext, useState } from "react";
import { SidebarContext } from "../../contexts/sidebar_context";
import s from "./index.module.scss"
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import vehicleImage from "../../../../../public/vecale-logo.svg"
import { AiOutlineDisconnect } from "react-icons/ai";
import Link from "next/link";
import AppModal from "@/core/components/Modal";
import Button from "@/core/components/Button";
import DashboardAppbar from "../DashboardAppbar";

export default function VehicleInfoBox() {
    const vehicle = useContext(SidebarContext)
    const [modalIsOpen, setModalState] = useState(false)
    const isDesktop = window.innerWidth > 900

    return <>

        <div className={s.container}>
            {isDesktop ? <DashboardAppbar /> : null}
            <div className={s.content}>
                {vehicle.active ? <>
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
                                <div className={s.h_line} />
                                <span>{vehicle.active?.model_variant}</span>
                            </Flex>
                        </div>

                    </Flex>
                    <Image className={s.car_image} src={vehicle.active?.image_url!} alt="" width={512} height={512} />
                    <p className="m-3 text-justify">You will receive battery health reports once we have collected enough charging data.</p>
                    <AppModal state={modalIsOpen} setState={setModalState} disableChild={<button className={s.di_button}>Disconnect <AiOutlineDisconnect /></button>} onClose={() => { }} >
                        <div className="mb-4">
                            <h4>Warning</h4>
                            <p>Are you sure you want to disconnect your vehicle from GENERATIONAL?</p>
                        </div>
                        <Flex justify={"between"}>
                            <Button text={"Discard"} type="soft" onClick={() => { setModalState(false) }} />
                            <Button text={"Yes, I want to disconnect my vehicle"} type="primary" />
                        </Flex>
                    </AppModal>
                </> : null}
            </div>
            <div>
                <hr />
                <div className={s.footer}>
                    <h3>
                        support@generational.ac
                    </h3>
                    <p>© 2024 – Generational Technologies. All rights reserved. Generational Technologies Ltd. | Company No. 12677491</p>
                    <Flex gap={"5"} >
                        <Link href={"https://generational.ac/#terms-and-conditions"}>Terms and conditions</Link>
                        <Link href={"https://generational.ac/#privacy"}>Privacy policy</Link>
                    </Flex>
                </div>
            </div>
        </div>
    </>
}