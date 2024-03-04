"use cilent"

import VehicleInfoBox from "@/faetures/dashboard/components/VehicleInfoBox";
import { Alert, Grid } from "@mui/material";
import s from "./../dashboard.module.scss"
import { Switch } from "@radix-ui/themes";
import Button from "@/core/components/Button";

export default function Page() {
    return <div className={s.container}>
        <Grid container>
            <Grid item xl={8} lg={8} md={6} sm={12} xs={12} className={s.body}>
                <div className={`${s.profile_form} m-3`}>
                    <div className={s.head}>
                        <h2>Information</h2>
                    </div>
                    <div className={s.content}>
                        <Grid container rowSpacing={2}>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>First name</Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <input className={s.input} />
                            </Grid>

                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>Last name</Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <input className={s.input} />
                            </Grid>

                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>Email Address</Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <input className={s.input} />
                            </Grid>

                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>I’m a Company Manager</Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Switch size={"3"} />
                            </Grid>

                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>Company name</Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <input className={s.input} />
                            </Grid>

                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>Receiving  battery health report emails</Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Switch size={"3"} />
                            </Grid>

                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} justifyContent={"end"} display={"flex"}>
                                <div style={{ width: 136 }}>
                                    <Button text="Save Changes" type="primary" />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={`${s.profile_form} m-3`}>
                    <div className={s.head}>
                        <h2>Deactivate Account</h2>
                    </div>
                    <div className={s.content}>
                        <Alert severity="warning">
                            <strong>You are deactivatiing your account</strong>
                            <p>For extra security, this requires you to confirm your email or phone number when you reset your password. Learn more</p>
                        </Alert>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} gap={"10px"} display={"flex"} paddingTop={"30px"} paddingBottom={"30px"}>
                            <input type="checkbox" style={{
                                padding: "10px",
                                width: "24px",
                                background: "rgba(243, 246, 249, 1)",
                                border: "none",
                                outline: "none"
                            }}/> <span>Confirm account deactivation</span>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} justifyContent={"end"} display={"flex"}>
                                <div style={{ width: 180 }}>
                                    <Button text="Deactivate Account" type="error" />
                                </div>
                            </Grid>
                    </div>
                </div>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <VehicleInfoBox />
            </Grid>
        </Grid>
    </div>
}