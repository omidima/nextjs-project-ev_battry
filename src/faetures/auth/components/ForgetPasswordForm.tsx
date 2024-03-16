"use client"

import Button from "@/core/components/Button"
import TextFieldInput from "@/core/components/TextFieldInput"
import parseSdk from "@/core/network/parse"
import { Snackbar } from "@mui/material"
import { useState } from "react"

export default function ForgetPasswordForm() {
    const [error, setError] = useState<string | null>(null)

    const [open, setOpen] = useState(false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function checkEmail(email: string) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!email || email!.search(regex) == -1) {
            return false
        }

        return true
    }

    return <form onSubmit={(e) => {
        e.preventDefault()
    }}>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Login in failed! Please try again"
        />
        <h1 className="mb-3">Forgot Password</h1>
        <p className="mb-6 text-center">Enter your email to reset your password</p>
        <div className="mb-4">
            <TextFieldInput error={error ?? undefined} label="Email" type="email" name="email" onChange={() => {
                setError(null)
            }} />
        </div>
        <Button full text="Send email" type="primary" onClick={async () => {
            const email = document.querySelector<HTMLInputElement>("input[name='email']")!.value
            if (checkEmail(email)) {
                try {
                    await parseSdk.User.requestPasswordReset(document.querySelector<HTMLInputElement>("input[name='email']")!.value)
                    history.back()
                } catch {
                    setOpen(true)
                }
            } else {
                setError("Please enter a valid email address.")
            }
        }} />
        <Button full text="Back" type="text" onClick={async () => {
            history.back()
        }} />
    </form>
}