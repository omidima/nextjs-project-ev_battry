import API from "@/utils/api";
import { VehicleDto } from "../types/vehicle.dto";


const api = API.getInstance()

export async function getGetVehicles() {
    return api.GetMethod<VehicleDto[]>({
        url: "http://localhost:3000/api/vehicle-status"
    })
}