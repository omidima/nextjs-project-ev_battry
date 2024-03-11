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
        <Container maxWidth="xs" className={s.footer}>
            <Flex justify={"between"} >
                <Link href={"https://generational.ac/#terms-and-conditions"}>Terms and conditions</Link>
                <Link href={"https://generational.ac/#privacy"}>Privacy policy</Link>
            </Flex>
        </Container>
    </>
}