import { Box, Container } from "@mui/material";
import { Flex } from "@radix-ui/themes";
import s from "../page.module.scss"
import LoginForm from "@/faetures/auth/components/LoginForm";
import Link from "next/link";


export default function Page() {
    return <>
        <Container maxWidth={"xs"}>
            <Box>
                <LoginForm />
            </Box>
        </Container>
        
    </>
}