import { Authdto } from "../types/auth.dto";
import parseSdk from "@/core/network/parse";
import { getCookie } from "@/utils/cookie_helper";
import { ACCESS_TOKEN } from "@/utils/storage_key";

export async function postLogin(username: string, password: string): Promise<Authdto> {
    const response = await parseSdk.User.logIn(username, password)

    return {
        full_name: response.get("full_name"),
        url: response.getEmail() ?? "",
        username: response.getUsername()!,
        sessionToken: response.getSessionToken()!
    }
}

export async function getCurrentUser() {
    return parseSdk.User.become(getCookie(ACCESS_TOKEN)!)
}