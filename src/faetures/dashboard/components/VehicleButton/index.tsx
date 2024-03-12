"use client"

import s from "./index.module.scss";
import { VehicleDto } from "../../types/vehicle.dto";
import { BiPlus } from "react-icons/bi";
import Image from "next/image";

interface Props {
    isActive?: boolean;
    item: VehicleDto
    type?: "item" | "default"
    onSelect?: (item: VehicleDto) => void
}

export default function VehicleButton(props: Props) {
    function returnLogo() {
        switch (props.item.make) {
            case "add":
                return <BiPlus />

            default:
                return <Image src={props.item.logo_url!} width={50} height={50} alt={""} />
        }
    }

    function renderText() {
        return <span>{props.type === "default" ? props.item.model : `${props.item.make} ${props.item.model} ${props.item.year}`}</span>
    }

    function handleType() {
        if ((typeof window !== "undefined")) {
            return window.innerWidth < 612 ? null : renderText()
        }

        return renderText()
    }

    return <div className={`${props.type === "item" ? s.item : s.new} ${props.isActive ? s.active : s.deactive}`} onClick={() => props.onSelect ? props.onSelect(props.item) : null}>
        <div>
            {returnLogo()}
        </div>
        <div>
            {handleType()}
        </div>
    </div>
}