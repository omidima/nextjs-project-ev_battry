import parseSdk from "@/core/network/parse";
import { VehicleDto } from "../types/vehicle.dto";

export async function getGetVehicles() : Promise<VehicleDto[]> {
    // const ratings = await parseSdk.Cloud.run("battery_data", {});
    // return ratings["battery_data"]

    return (await (await fetch("/api/vehicle-status")).json())["result"]["battery_data"]
}

export async function connectNewVehicle(url: string) {
    window.open(`${url}`,"_blank")
}