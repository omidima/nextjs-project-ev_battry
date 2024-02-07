import { Box, Container } from "@mui/material";
import { Flex } from "@radix-ui/themes";
import s from "../page.module.scss"
import LoginForm from "@/faetures/auth/components/LoginForm";


export default function Page() {
    return <>
        <Container maxWidth={"xs"}>
            <Box>
                <LoginForm />
            </Box>
        </Container>
        <Container maxWidth="xs" className={s.footer}>
            <Flex justify={"between"} >
                <p>Terms and Conditions</p>
                <p>Privacy Policy</p>
            </Flex>
        </Container>
    </>
}