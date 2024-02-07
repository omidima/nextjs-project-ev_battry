
import { ACCESS_TOKEN } from "@/utils/storage_key";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Dashboard",

}

export default function Layout({ children }: { children: React.ReactNode }) {
    if (!cookies().get(ACCESS_TOKEN)?.value) {
        redirect("/signup")
    }

    return <>{children}</>
}