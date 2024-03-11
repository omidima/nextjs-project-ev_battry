"use client"

import { useState } from "react"
import s from "./style.module.scss"
import { CircularProgress } from "@mui/material"

interface Props {
    type?: "primary" | "outline" | "text" | "soft" | "error",
    text: string,
    full?: boolean,
    onClick?: () => void

}


export default function Button(props: Props) {
    const [loading, setLoading] = useState(false)

    const handleType = () => {
        switch (props.type) {
            case "primary":
                return s.primary
            case "outline":
                return s.outline
            case "text":
                return s.text
            case "soft":
                return s.soft
            case "error":
                return s.error
        }
    }
    return <div className={handleType()}
        style={{
            width: props.full ? "w-100" : "fit-content"
        }}
        onClick={async () => {
            setLoading(true)
            props.onClick ? await props.onClick!() : null
            setLoading(false)
        }}>
        <span>{loading ? <CircularProgress size={"20px"} color={props.type === "primary" ? "inherit" : "primary"} /> : props.text}</span>
    </div>
}