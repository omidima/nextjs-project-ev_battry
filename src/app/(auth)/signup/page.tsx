import { Box, Container } from "@mui/material";
import SignupForm from "../../../faetures/auth/components/SignupForm/SignupForm";
import { Flex } from "@radix-ui/themes";
import s from "../page.module.scss"

export default function Page() {
    return <>
        <Container maxWidth={"xs"}>
            <Box>
                <SignupForm />
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