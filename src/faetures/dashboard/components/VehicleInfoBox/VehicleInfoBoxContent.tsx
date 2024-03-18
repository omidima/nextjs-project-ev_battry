import s from "./index.module.scss";

import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import AppModal from "@/core/components/Modal";
import { AiOutlineDisconnect } from "react-icons/ai";
import Button from "@/core/components/Button";
import parseSdk from "@/core/network/parse";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar_context";

export default function VehicleInfoBoxContent() {
    const vehicle = useContext(SidebarContext)

    return <div className={s.content}>
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
            <Flex className={s.status_box} justify={"between"} wrap={"wrap"}>
                <span>Status:</span>
                <div>
                    <strong style={{ color: "rgba(98, 190, 129, 1)" }}>Connected </strong><span style={{ color: "rgba(156, 156, 156, 1)" }}>{`(${vehicle.active.since})`}</span>
                </div>
            </Flex>
            <p className="m-3">
                You will receive email confirmation that your vehicle is connected. If you do not receive anything please check your spam folder. Battery health reports are sent by email once we have collected enough charging data.
                <br />
                <br />
                If the correct model/variant is not showing, please email support@generational.ac with the correct vehicle details, or drop us a message in the chat. This will allow us to provide you with a more accurate assessment.
            </p>
            <AppModal disableChild={<button className={s.di_button}>Disconnect <AiOutlineDisconnect /></button>} onClose={() => { }} >
                <div className="mb-4">
                    <h4>Warning</h4>
                    <p>Are you sure you want to disconnect your vehicle from Generational?</p>
                </div>
                <Flex justify={"between"} style={{ fontSize: 12 }} wrap={"wrap"}>
                    <Button text={"Back"} type="soft" onClick={() => { history.back() }} />
                    <div >
                        <p className="mb-2"></p>
                    </div>
                    <Button text={"Yes, I want to disconnect my vehicle"} type="primary" onClick={async () => {
                        const params = { vehiclId: vehicle.active?.id };
                        await parseSdk.Cloud.run("disconnect_vehicle", params);
                        location.reload()
                    }} />
                </Flex>
            </AppModal>
        </> : null}
    </div>
}