"use client"

import { Flex } from "@radix-ui/themes"
import s from "./style.module.scss"
import { ChangeEvent, ReactNode, useState } from "react"

interface Props {
    label: string
    lead?: ReactNode
    helper?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    id?: string
    name?: string
    defaultValue?: string
    value?: string,
    type?: string,
    error?: string,
    required?: boolean
}

export default function TextFieldInput(props: Props) {
    const [focus, setFocus] = useState(false)

    return <>
        <Flex justify="between" align={"start"}>
            <div className={s.label}>{props.label}</div>
            <div className={s.lead}>{props.lead}</div>
        </Flex>
        <input onFocus={(e) => {
            setFocus(!focus)
        }} className={`${s.input} ${focus ? props.error ? s.error : s.success : null}`}
            onChange={props.onChange}
            type={props.type}
            defaultValue={props.defaultValue}
            required={props.required ?? false}
            name={props.name} id={props.id} />
        <div className={props.error ? s.error : ""} style={{marginTop:10}}>{props.error}</div>
    </>
}