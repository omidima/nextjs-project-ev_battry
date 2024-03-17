"use client"

import Button from "@/core/components/Button"
import TextFieldInput from "@/core/components/TextFieldInput"
import Link from "next/link"
import { postLogin } from "../apis/auth"
import { setCookie } from "@/utils/cookie_helper"
import { ACCESS_TOKEN, USER_DATA } from "@/utils/storage_key"
import { useState } from "react"
import { Snackbar } from "@mui/material"

export default function LoginForm() {
    const [open, setOpen] = useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return <form onSubmit={(e) => {
        e.preventDefault()
    }}>
        <style jsx>{`
        .login_button {
            display: flex;
            gap: 5px;
            justify-content: center;
        
            a {
                span {
                    color: var(--primary-color);
                    font-weight: bold;
                }
            }
        }
        `}</style>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Log in failed. Please try again"
        />
        <h1 className="mb-6">Sign in to Generational</h1>
        <div className="mb-4">
            <TextFieldInput label="Email" type="email" name="email" required />
        </div>
        <div className="mb-4">
            <TextFieldInput label="Password" type="password" lead={<Link href={"/forget-password"}>Forgot password?</Link>} name="password" required />
        </div>
        <Button full text="Sign in" type="primary" onClick={async () => {
            try {
                const response = await postLogin(
                    document.querySelector<HTMLInputElement>("input[name='email']")?.value!,
                    document.querySelector<HTMLInputElement>("input[name='password']")?.value!,
                )

                setCookie(USER_DATA, JSON.stringify(response))
                setCookie(ACCESS_TOKEN, response.sessionToken)
                setTimeout(() => {
                    location.replace("/dashboard")
                }, 1000)
            } catch {
                setOpen(true)
            }
        }} />
        <div className={`login_button text-center mt-6`}>
            <Link href={"/signup"}><span>Create an account</span></Link>
        </div>
    </form>
}