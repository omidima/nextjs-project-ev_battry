"use client"

import Button from "@/core/components/Button"
import TextFieldInput from "@/core/components/TextFieldInput"
import Link from "next/link"
import { postLogin } from "../apis/auth"
import { setCookie } from "@/utils/cookie_helper"
import { ACCESS_TOKEN, USER_DATA } from "@/utils/storage_key"

export default function LoginForm() {
    return <form onSubmit={(e) => {
        e.preventDefault()
    }}>
        <h1 className="mb-6">Sign In to Generational</h1>
        <div className="mb-4">
            <TextFieldInput label="Email" type="email" name="email" required/>
        </div>
        <div className="mb-4">
            <TextFieldInput label="Passsword" type="password" lead={<Link href={"/forget-password"}>Forget Password?</Link>} name="password" required />
        </div>
        <Button text="Sign In" type="primary" onClick={async () => {
            const response = await postLogin(
                document.querySelector<HTMLInputElement>("input[name='email']")?.value!,
                document.querySelector<HTMLInputElement>("input[name='password']")?.value!,
            )

            setCookie(USER_DATA, JSON.stringify(response))
            setCookie(ACCESS_TOKEN, response.sessionToken)
            setTimeout(() => {
                location.replace("/dashboard")
            }, 1000)
        }} />
    </form>
}