import { Metadata } from "next"
import React from "react"


export const metadata: Metadata = {
    title: "Dashboard",

}

export default function Template({ children }: { children: React.ReactNode }) {

    return <>{children}</>
}