import API from "@/utils/api";
import { VehicleDto } from "../types/vehicle.dto";
import { API_URL } from "@/utils/app_constant";


const api = API.getInstance()

export async function getGetVehicles() {
    return api.GetMethod<VehicleDto[]>({
        url: `${API_URL}/api/vehicle-status`
    })
}