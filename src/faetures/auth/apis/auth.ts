import API from "@/utils/api";
import { Authdto } from "../types/auth.dto";


const api = API.getInstance()

export async function postLogin(username: string, password: string): Promise<Authdto> {
    await new Promise(r => setTimeout(r, 2000));

    return {
        full_name: "omid hadidy",
        url: "sample url",
        username: "omid_hadidy"
    }
}