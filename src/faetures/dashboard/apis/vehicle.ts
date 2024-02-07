import API from "@/utils/api";
import { VehicleDto } from "../types/vehicle.dto";


const api = API.getInstance()

export async function getGetVehicles() {
    return api.GetMethod<VehicleDto[]>({
        url: "https://nextjs-project-ev-battry-rfaez4fxe-omidima.vercel.app/api/vehicle-status"
    })
}