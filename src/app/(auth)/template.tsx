import { ReactNode } from "react";
import image from "../../../public/login-bg.png";
import Image from "next/image";
import logo from "../../../public/Logo.svg"
import s from "./page.module.scss"
import { Box, Grid } from "@mui/material";

export default function Template({ children }: { children: ReactNode }) {
    return <Box>
        <Grid container>
            <Grid xl={4} lg={4} md={6} sm={6} xs={0} className={s.sidebar}>
                <Image className={s.cover} src={image} alt="" width={512} height={512} />
                <div className={s.content}>
                    <Image src={logo} alt="" />
                    <p className="mb-4">The signup process takes less than 2 mins and involves us securely connecting to your connected car account. </p>
                    <p className="mb-4">We use data from your battery usage and charging habits to deliver a fully personalized report for your vehicle over email. </p>
                    <p className="mb-4">The report is generated after we’ve collected enough data to confidently assess your battery’s state-of-health and can take up to 6 weeks depending on how often you charge your vehicle</p>
                </div>

            </Grid>
            <Grid xl={8} lg={8} md={6} sm={6} xs={12} className={s.form_body}>
                {children}
            </Grid>
        </Grid>
    </Box>
}