import API from "@/utils/api";
import { VehicleDto } from "../types/vehicle.dto";
import { API_URL } from "@/utils/app_constant";


const api = API.getInstance()

export async function getGetVehicles() {
    return api.GetMethod<VehicleDto[]>({
        url: `${API_URL}/api/vehicle-status`
    })
}

export async function connectNewVehicle(userId: string) {
    location.replace(`https://connect.telematica.so/connect?app=2f827b47-685e-4dc3-9e08-5ede7b9bc0a0&user=${userId}&callbackEnv=prod&appName=Battery+Lab`)
}