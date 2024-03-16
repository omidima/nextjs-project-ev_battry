import { Box, Container } from "@mui/material";
import { Flex } from "@radix-ui/themes";
import s from "../page.module.scss"
import ForgetPasswordForm from "@/faetures/auth/components/ForgetPasswordForm";
import Link from "next/link";


export default function Page() {
    return <>
        <Container maxWidth={"xs"}>
            <Box>
                <ForgetPasswordForm />
            </Box>
        </Container>
    </>
}