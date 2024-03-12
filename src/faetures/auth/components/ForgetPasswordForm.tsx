"use client"

import Button from "@/core/components/Button"
import TextFieldInput from "@/core/components/TextFieldInput"

export default function ForgetPasswordForm() {
    return <form onSubmit={(e) => {
        e.preventDefault()
    }}>
        <h1 className="mb-3">Forgot Password</h1>
        <p className="mb-6 text-center">Enter your email to reset your password</p>
        <div className="mb-4">
            <TextFieldInput label="Email" type="email" name="email" />
        </div>
        <Button full text="Send Email" type="primary" onClick={async () => {

        }} />
        <Button full text="Back" type="text" onClick={async () => {
            history.back()
        }} />
    </form>
}