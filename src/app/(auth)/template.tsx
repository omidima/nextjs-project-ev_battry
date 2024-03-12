import { ReactNode } from "react";
import image from "../../../public/login-bg.png";
import Image from "next/image";
import logo from "../../../public/Logo.svg"
import s from "./page.module.scss"
import { Box, Grid } from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
    if (cookies().get("access_token")?.value) {
        redirect("/dashboard")
    }

    return <Box>
        <Grid container height={"100vh"} overflow={"auto"}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}  className={s.sidebar}>
                <Image className={s.cover} src={image} alt="" width={512} height={512} />
                <div className={s.content}>
                    <Image src={logo} alt="" />
                    <p className="mb-4">Welcome to Generational, sign-up your EV to receive free battery health checks.</p>
                    <p className="mb-4">The sign-up process takes less than two minutes and involves us securely connecting to your connected car account. </p>
                    <p className="mb-4">We use data from your battery usage and charging habits to deliver a fully personalised report for your vehicle. </p>
                    <p className="mb-4">Once we have connected enough charging data we will email you a battery health assessment including tailored advice on how to extend its lifetime.</p>
                    <p className="mb-4">Our application is in Beta. Please email us at support@generational.ac or message us using the chat widget if you have any issues.</p>
                    <p className="mb-4">The service is currently only available for UK EVs.</p>
                </div>

            </Grid>
            <Grid item xl={8} lg={8} md={6} sm={12} xs={12} className={s.form_body}>
                {children}
            </Grid>
        </Grid>
    </Box>
}