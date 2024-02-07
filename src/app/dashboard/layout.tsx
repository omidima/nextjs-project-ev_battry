import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Dashboard",

}

export default function Layout({ children }: { children: React.ReactNode }) {
    // @TODO: enable of production version
    // if (!cookies().get(ACCESS_TOKEN)?.value) {
    //     redirect("/signup")
    // }

    return <>{children}</>
}