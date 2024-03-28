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
    company: boolean
}

const initValidation = {
    email: false,
    firstname: false,
    lastname: false,
    company: false
}


export default function Form(props: { onSubmit: () => void }) {
    const [open, setOpen] = useState(false);
    const [validation, setValidation] = useState<validation>(initValidation);
    const [isActiveCompanyField, setActiveCompanyField] = useState<boolean>(false);

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

    function validateForm(setError?: boolean): boolean {
        const email = document.querySelector<HTMLInputElement>("input[name='email']")?.value;
        const first_name = document.querySelector<HTMLInputElement>("input[name='first_name']")?.value;
        const last_name = document.querySelector<HTMLInputElement>("input[name='last_name']")?.value;
        const company_name = document.querySelector<HTMLInputElement>("input[name='company']")?.value;

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if (setError) {
            if (!email || email!.search(regex) == -1) {
                validation.email = true
            }

            if (!first_name) {
                validation.firstname = true
            }

            if (!last_name) {
                validation.lastname = true
            }

            if (isActiveCompanyField && (!company_name || company_name == "")) {
                validation.company = true
            }

            setValidation({ ...validation })
        }

        if (validation.email || validation.firstname || validation.lastname || validation.company) {
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
                message="Log in failed. Please try again."
            />
            <h1 className="mb-2">Welcome to Generational</h1>
            <p className="mb-6 text-center">Sign-up your EV to receive free battery health checks.</p>
            <div className="mb-4">
                <TextFieldInput error={validation.firstname ? "Please enter your first name." : undefined} label="First name" type="text" name="first_name" required onChange={() => setValidation({ ...initValidation })} />
            </div>
            <div className="mb-4">
                <TextFieldInput error={validation.lastname ? "Please enter your last name." : undefined} label="Last name" type="text" name="last_name" required onChange={() => setValidation({ ...initValidation })} />
            </div>
            <div className="mb-4">
                <TextFieldInput error={validation.email ? "Please enter a valid email address." : undefined} label="Email" type="email" name="email" required onChange={() => setValidation({ ...initValidation })} />
            </div>

            <div className="mb-4">
                <Flex align={"center"} gap={"2"}>
                    <input type="checkbox" className={s.checkbox} onChange={(e) => {
                        setActiveCompanyField(!isActiveCompanyField)
                    }} /> <span>Fleet manager</span>
                </Flex>
            </div>

            {isActiveCompanyField ? <div className="mb-4">
                <TextFieldInput
                    onChange={() => setValidation({ ...initValidation })}
                    error={validation.company ? "Please enter a company name." : undefined}
                    label="Company name" type="text" name="company" required />
            </div> : null}
            <Button full text="Continue" type={validation.email || validation.firstname || validation.lastname ? "soft" : "primary"} onClick={async () => {

                if (validateForm(true)) {
                    const result = await isAvailable(document.querySelector<HTMLInputElement>("input[name='email']")?.value!)
                    if (result) {
                        const email = document.querySelector<HTMLInputElement>("input[name='email']")?.value;
                        const first_name = document.querySelector<HTMLInputElement>("input[name='first_name']")?.value;
                        const last_name = document.querySelector<HTMLInputElement>("input[name='last_name']")?.value;
                        const company_name = document.querySelector<HTMLInputElement>("input[name='company']")?.value;

                        localStorage.setItem(USER_DATA, JSON.stringify({
                            firstname: first_name,
                            lastname: last_name,
                            email: email,
                            company_name: company_name
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
                <Link href={"/signin"}><span>Sign in</span></Link>
            </div>
        </form>
    </>
}