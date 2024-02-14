import Button from "@/core/components/Button";
import TextFieldInput from "@/core/components/TextFieldInput";
import { setCookie } from "@/utils/cookie_helper";
import { USER_DATA, ACCESS_TOKEN } from "@/utils/storage_key";
import { Snackbar } from "@mui/material";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { postSingup } from "../../apis/auth";
import s from "./index.module.scss"

export default function SetPassword(props: { onBack: () => void }) {
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState({
        number: false,
        char: false,
        case: false,
        length: false
    });
    const [error, setError] = useState<undefined | string>(undefined)

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const checkPasswordStrength = (password: string) => {
        const checker = { ...score }

        // Add points for length
        if (password.length >= 8) {
            console.log("len")
            checker.length = true
            setScore(checker)
        } else {
            checker.length = false
            setScore(checker)
        }

        // Add points for capital letters
        if (/[A-Z]/.test(password)) {
            console.log("len")
            checker.case = true
            setScore(checker)
        } else {
            checker.case = false
            setScore(checker)
        }

        // Add points for numbers
        if (/[0-9]/.test(password)) {
            console.log("len")
            checker.number = true
            setScore(checker)
        } else {
            checker.number = false
            setScore(checker)
        }

        // Add points for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            console.log("len")
            checker.char = true
            setScore(checker)
        } else {
            checker.char = false
            setScore(checker)
        }
    };

    function StrengthCounter() {
        const list = Object.entries(score)
        const trueValues = list.filter(([_, value]) => value === true);
        const falseValues = list.filter(([_, value]) => value === false);
        const sortedList = [...trueValues, ...falseValues]

        return <>
            <div className={`${s.init} ${sortedList[0][1] ? s.active : ""}`} style={sortedList[0][1] && trueValues.length < 3 ? {
                background: "red"
            } : undefined} />
            <div className={`${s.init} ${sortedList[1][1] ? s.active : ""}`} style={sortedList[1][1] && trueValues.length < 3 ? {
                background: "red"
            } : undefined} />
            <div className={`${s.init} ${sortedList[2][1] ? s.active : ""}`} />
            <div className={`${s.init} ${sortedList[3][1] ? s.active : ""}`} />
        </>
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
                <TextFieldInput label="Password" type="password" name="password" required onChange={(e) => checkPasswordStrength(e.target.value)} />
                <Flex gap={"2"}>
                    <StrengthCounter />
                </Flex>
            </div>
            <div className="mb-4">
                <TextFieldInput error={error} label="Confirm Password" type="password" name="c_password" required />
            </div>

            <Button text="Sign Up" type="primary" onClick={async () => {
                const password = document.querySelector<HTMLInputElement>("input[name='password']")?.value;
                const confirm = document.querySelector<HTMLInputElement>("input[name='c_password']")?.value;
                if (password === confirm) {
                    const email = document.querySelector<HTMLInputElement>("input[name='email']")?.value;
                    const first_name = document.querySelector<HTMLInputElement>("input[name='first_name']")?.value;
                    const last_name = document.querySelector<HTMLInputElement>("input[name='last_name']")?.value;

                    try {
                        const response = await postSingup({
                            username: email!,
                            firstname: first_name!,
                            lastname: last_name!,
                            password: password!,
                            isCompany: false
                        })

                        setCookie(USER_DATA, JSON.stringify(response))
                        setCookie(ACCESS_TOKEN, response.getSessionToken())
                        setTimeout(() => {
                            location.replace("/dashboard")
                        }, 1000)
                    } catch {
                        setOpen(true)
                    }

                }
            }} />
            <div className="mb-4" />
            <Button text="Back" type="text" onClick={async () => {
                props.onBack()
            }} />

        </form>
    </>
}