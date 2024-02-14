"use client"

import { useState } from "react";
import Form from "./Form";
import SetPassword from "./SetPassword";


export default function SignupForm() {
    const [step, setStep] = useState(0)

    return <>
        <div style={{ display: step == 1 ? "none" : "unset" }}>
            <Form onSubmit={() => { setStep(1) }} />
        </div>
        <div style={{ display: step == 0 ? "none" : "unset" }}>
            <SetPassword onBack={() => { setStep(0) }} />
        </div>
    </>

}


