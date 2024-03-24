import { Authdto } from "../types/auth.dto";
import parseSdk from "@/core/network/parse";
import { getCookie } from "@/utils/cookie_helper";
import { ACCESS_TOKEN } from "@/utils/storage_key";
import Parse from "parse"

export async function postLogin(username: string, password: string): Promise<Authdto> {
    const response = await parseSdk.User.logIn(username, password)

    return {
        full_name: response.get("full_name"),
        url: response.getEmail() ?? "",
        username: response.getUsername()!,
        sessionToken: response.getSessionToken()!
    }
}


export async function checkAvailableUsername(username: string) {
    const query = new Parse.Query(parseSdk.User)
    query.contains("username", username)
    return query.find()
}

export async function postSingup(data: {
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    companyName?: string
}) {
    return await parseSdk.User.signUp(data.username, data.password, {
        lastname: data.lastname,
        firstname: data.firstname,
        email: data.username,
        company_name: data.companyName,
        isCompany: data.companyName != undefined
    })
}

export async function updateProfile(data: {
    firstname?: string,
    lastname?: string,
    company_name?: string,
    isCompany?: boolean,
    received_battery_repo?: boolean
}) {
    const user = await parseSdk.User.current()
    user!.set("company_name", data.company_name)
    data.lastname ? user!.set("lastname", data.lastname) : null
    data.firstname ? user!.set("firstname", data.firstname) : null
    user!.set("isCompany", data.isCompany)
    user!.set("received_bat_health_rep", data.received_battery_repo ?? false)

    return await user?.save()
}

export async function getCurrentUser() {
    return parseSdk.User.become(getCookie(ACCESS_TOKEN)!)
}