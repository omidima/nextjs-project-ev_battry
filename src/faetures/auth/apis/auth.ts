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
    query.contains("username",username)
    return query.find()
}

export async function postSingup(data: {
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    isCompany: boolean
}) {
    return await parseSdk.User.signUp(data.username,data.password, {
        lastname: data.lastname,
        firstname: data.firstname,
        email: data.username
    })
}

export async function getCurrentUser() {
    return parseSdk.User.become(getCookie(ACCESS_TOKEN)!)
}