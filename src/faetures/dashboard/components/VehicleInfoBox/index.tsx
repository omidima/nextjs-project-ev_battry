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
import parseSdk from "@/core/network/parse";

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
                        <Image src={vehicle.active.logo_url!} width={50} height={50} alt={""} />
                        <div className="">
                            <p>{vehicle.active.make}</p>
                            <Flex align={"center"}>
                                <div>
                                    <span>{vehicle.active?.model}</span>
                                    <br />
                                    <span>{vehicle.active?.model_variant}</span>
                                </div>
                                <div className={s.h_line} />
                                <span>{vehicle.active?.year}</span>
                                <div className={s.h_line} />
                                <span>{vehicle.active?.mileage} mi</span>
                            </Flex>
                        </div>

                    </Flex>
                    <Image className={s.car_image} src={vehicle.active?.image_url!} alt="" width={512} height={512} />
                    <p className="m-3">
                        You will receive email confirmation that your vehicle is connected. If you do not receive anything please check your spam folder. Battery health reports are sent by email once we have collected enough charging data.
                        <br />
                        <br />
                        If the correct model/variant is not showing, please email support@generational.ac with the correct vehicle details, or drop us a message in the chat. This will allow us to provide you with a more accurate assessment.
                    </p>
                    <AppModal state={modalIsOpen} setState={setModalState} disableChild={<button className={s.di_button}>Disconnect <AiOutlineDisconnect /></button>} onClose={() => { }} >
                        <div className="mb-4">
                            <h4>Warning</h4>
                            <p>Are you sure you want to disconnect your vehicle from GENERATIONAL?</p>
                        </div>
                        <Flex justify={"between"}>
                            <Button text={"Discard"} type="soft" onClick={() => { history.back() }} />
                            <Button text={"Yes, I want to disconnect my vehicle"} type="primary" onClick={async () => {
                                const params = { vehiclId: vehicle.active?.id };
                                await parseSdk.Cloud.run("disconnect_vehicle", params);
                                location.reload()
                            }} />
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