import { useState } from "react";
import { checkAvailableUsername } from "../../apis/auth";
import { Snackbar } from "@mui/material";
import TextFieldInput from "@/core/components/TextFieldInput";
import { Flex } from "@radix-ui/themes";
import Button from "@/core/components/Button";
import { USER_DATA } from "@/utils/storage_key";
import Link from "next/link";
import s from "./index.module.scss"

interface validation {
    firstname: boolean
    lastname: boolean
    email: boolean
}

const initValidation = {
    email: false,
    firstname: false,
    lastname: false
}


export default function Form(props: { onSubmit: () => void }) {
    const [open, setOpen] = useState(false);
    const [validation, setValidation] = useState<validation>(initValidation);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const isAvailable = async (username: string) => {
        const user = await checkAvailableUsername(username)
        return user.length === 0;
    }

    function validateForm(): boolean {
        const email = document.querySelector<HTMLInputElement>("input[name='email']")?.value;
        const first_name = document.querySelector<HTMLInputElement>("input[name='first_name']")?.value;
        const last_name = document.querySelector<HTMLInputElement>("input[name='last_name']")?.value;

        if (!email) {
            validation.email = true
        }

        if (!first_name) {
            validation.firstname = true
        }

        if (!last_name) {
            validation.lastname = true
        }

        setValidation({...validation})

        if (validation.email || validation.firstname || validation.lastname) {
            return false
        }

        return true
    }

    return <>
        <form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Login in failed! please try again"
            />
            <h1 className="mb-2">Welcome to Generational</h1>
            <p className="mb-6 text-center">Sign-up your EV to receive free battery health checks.</p>
            <div className="mb-4">
                <TextFieldInput error={validation.firstname ? "Check this field." : undefined} label="Firstname" type="text" name="first_name" required onChange={() => setValidation({...initValidation})} />
            </div>
            <div className="mb-4">
                <TextFieldInput error={validation.lastname ? "Check this field." : undefined} label="Surename" type="text" name="last_name" required onChange={() => setValidation({...initValidation})} />
            </div>
            <div className="mb-4">
                <TextFieldInput error={validation.email ? "email address incorrect or unavailable." : undefined} label="Email" type="email" name="email" required onChange={() => setValidation({...initValidation})} />
            </div>

            <div className="mb-4">
                <Flex align={"center"} gap={"2"}>
                    <input type="checkbox" className={s.checkbox} /> <span>I’m a Company Manager</span>
                </Flex>
            </div>
            <Button text="Continue" type="primary" onClick={async () => {

                if (validateForm()) {
                    const result = await isAvailable(document.querySelector<HTMLInputElement>("input[name='email']")?.value!)
                    if (result) {
                        const email = document.querySelector<HTMLInputElement>("input[name='email']")?.value;
                        const first_name = document.querySelector<HTMLInputElement>("input[name='first_name']")?.value;
                        const last_name = document.querySelector<HTMLInputElement>("input[name='last_name']")?.value;

                        localStorage.setItem(USER_DATA, JSON.stringify({
                            firstname: first_name,
                            lastname: last_name,
                            email: email
                        }))

                        props.onSubmit()
                    } else {
                        validation.email = true
                        setValidation(validation)
                    }
                }
            }} />

            <div className={`${s.login_button} text-center mt-6`}>
                <span>Have an account? </span>
                <Link href={"/signin"}><span>Sign In</span></Link>
            </div>
        </form>
    </>
}