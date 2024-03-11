import { Box, Container } from "@mui/material";
import SignupForm from "../../../faetures/auth/components/SignupForm/SignupForm";
import { Flex } from "@radix-ui/themes";
import s from "../page.module.scss"
import Link from "next/link";

export default function Page() {
    return <>
        <Container maxWidth={"xs"} style={{
            overflow: "auto",
            height:"100%"
        }}>
            <Box>
                <SignupForm />
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