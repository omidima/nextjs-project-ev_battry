"use client"

import { ReactNode } from "react";
import s from "./index.module.scss";
import { VehicleDto } from "../../types/vehicle.dto";
import { SiMercedes, SiTesla } from "react-icons/si";
import { BiPlus } from "react-icons/bi";

interface Props {
    isActive?: boolean;
    item: VehicleDto
    type?: "item" | "default"
    onSelect?: (item: VehicleDto) => void
}

export default function VehicleButton(props: Props) {
    function returnLogo() {
        switch (props.item.brand) {
            case "tesla":
                return <SiTesla />
            case "Mercedes-Benz":
                return <SiMercedes />
            case "add":
                return <BiPlus />
        }
    }

    function renderText() {
        return props.type === "default" ? props.item.name : `${props.item.brand} ${props.item.name} ${props.item.model}`
    }

    return <div className={`${props.type === "item" ? s.item : s.new} ${props.isActive ? s.active : s.deactive}`} onClick={() => props.onSelect ? props.onSelect(props.item) : null}>
        <div>
            {returnLogo()}
        </div>
        <div>
            {window.innerWidth < 612 ? null : renderText()}
        </div>
    </div>
}