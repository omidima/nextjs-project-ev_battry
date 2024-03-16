"use client"

import VehicleInfoBox from "@/faetures/dashboard/components/VehicleInfoBox";
import { Alert, Grid } from "@mui/material";
import s from "./../dashboard.module.scss"
import { Flex, Switch } from "@radix-ui/themes";
import Button from "@/core/components/Button";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser, updateProfile } from "@/faetures/auth/apis/auth";
import parseSdk from "@/core/network/parse";
import { clearCookies } from "@/utils/cookie_helper";
import DashboardAppbar from "@/faetures/dashboard/components/DashboardAppbar";

export default function Page() {
    const [isCompany, setCompanyState] = useState(false)
    const [receivedBatteryRepoState, setReceivedBatteryRepoState] = useState(true)

    const confirm = useRef(false)
    const [user, setUser] = useState<null | Parse.User>(null)
    const isDesktop = window.innerWidth > 900

    useEffect(() => {
        getCurrentUser().then((e) => {
            setUser(e)
            setCompanyState(e.get("isCompany"))
            setReceivedBatteryRepoState(e.get("received_bat_health_rep") ?? false)
        })
    }, [])

    return <div className={s.container}>
        {isDesktop ? null : <DashboardAppbar />}
        <Grid container className={isDesktop ? undefined : "mt-6"}>
            <Grid item xl={8} lg={8} md={6} sm={12} xs={12} className={s.body}>
                <form>
                    <div className={`${s.profile_form} m-3`}>
                        <div className={s.head}>
                            <h2>Information</h2>
                        </div>
                        <div className={s.content}>
                            <Grid container rowSpacing={2}>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignItems={"center"} display={"flex"}>First name</Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <input name="first_name" className={s.input} defaultValue={user?.get("firstname")} />
                                </Grid>

                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignItems={"center"} display={"flex"}>Last name</Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <input name="last_name" className={s.input} defaultValue={user?.get("lastname")} />
                                </Grid>

                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignItems={"center"} display={"flex"}>Email address</Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <input disabled name="email" className={s.input} defaultValue={user?.getEmail()} />
                                </Grid>

                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignItems={"center"} display={"flex"}>Fleet manager</Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Switch size={"3"} onCheckedChange={(e) => {
                                        setCompanyState(e)
                                    }} checked={isCompany} />
                                </Grid>

                                {isCompany ? <>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignItems={"center"} display={"flex"}>Company name</Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <input name="company_name" className={s.input} defaultValue={user?.get("company_name")} />
                                    </Grid>
                                </> : null}

                                {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignItems={"center"} display={"flex"}>Receive battery health report emails</Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Switch size={"3"} checked={receivedBatteryRepoState} onCheckedChange={(e) => {
                                        setReceivedBatteryRepoState(e)
                                    }} />
                                </Grid> */}

                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} justifyContent={"end"} display={"flex"}>
                                    <div style={{ width: 136 }}>
                                        <Button text="Save changes" type="primary" onClick={async () => {
                                            const first_name = document.querySelector<HTMLInputElement>("input[name='first_name']")?.value
                                            const last_name = document.querySelector<HTMLInputElement>("input[name='last_name']")?.value
                                            const company_name = document.querySelector<HTMLInputElement>("input[name='company_name']")?.value

                                            await updateProfile({
                                                firstname: first_name,
                                                lastname: last_name,
                                                company_name: company_name,
                                                isCompany: isCompany,
                                                received_battery_repo: receivedBatteryRepoState
                                            })
                                        }} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
                <div className={`${s.profile_form} m-3`}>
                    <div className={s.head}>
                        <h2>Deactivate account</h2>
                    </div>
                    <div className={s.content}>
                        <Alert severity="warning">
                            <p>All vehicles will be disconnected and you will need to set-up a new account to rejoin the service.</p>
                        </Alert>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} gap={"10px"} display={"flex"} paddingTop={"30px"} paddingBottom={"30px"}>
                            <input type="checkbox" name="tick" onChange={(e) => {
                                confirm.current = e.target.checked
                            }} style={{
                                padding: "10px",
                                width: "24px",
                                background: "rgba(243, 246, 249, 1)",
                                border: "none",
                                outline: "none"
                            }} /> <span>Confirm account deactivation</span>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} justifyContent={"end"} display={"flex"}>
                            <div style={{ width: 180 }}>

                                <Button text="Deactivate account" type="error" onClick={async () => {
                                    if (confirm.current) {
                                        await parseSdk.User.current()?.destroy()
                                        localStorage.clear()
                                        clearCookies()
                                        location.replace("/signup")
                                    } else {
                                        alert("To deactivate your account, check the ‘Confirm account deactivation’ box.")
                                    }
                                }} />
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