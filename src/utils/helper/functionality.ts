import parseSdk from "@/core/network/parse"
import { clearCookies } from "../cookie_helper"

export async function logout() {
    await parseSdk.User.logOut()

    localStorage.clear()
    clearCookies()
    location.replace("/signin")
}