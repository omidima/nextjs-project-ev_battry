import s from "./index.module.scss"
import { Flex, Link } from "@radix-ui/themes";

export default function VehicleInfoBoxFooter() {
    return <div>
        <hr />
        <div className={s.footer}>
            <h3>
                support@generational.ac
            </h3>
            <p>© 2024 – Generational Technologies. All rights reserved. Generational Technologies Ltd. | Company No. 12677491</p>
            <Flex gap={"5"} >
                <Link href={"https://generational.ac/#terms-and-conditions"}>Terms and conditions</Link>
                <Link href={"https://generational.ac/#privacy"}>Privacy policy</Link>
            </Flex>
        </div>
    </div>
}