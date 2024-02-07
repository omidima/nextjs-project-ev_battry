"use client"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import s from "./index.module.scss";
import { useRouter } from "next/navigation";
import { Flex } from "@radix-ui/themes";
import { RiCloseLine } from "react-icons/ri";


interface Props {
    onClose: () => void,
    disableChild: ReactNode,
    children?: ReactNode,
    isFull?: boolean,
    state?: boolean,
    setState?: Dispatch<SetStateAction<boolean>>
}


export default function Modal(props: Props) {

    const [state, setState] = useState(false)
    const router = useRouter()


    useEffect(() => {
        if (state) {
            document.body.scrollTo({ top: 0 })
            document.body.setAttribute("style", "height:95vh; overflow: hidden;")
        } else {
            document.body.setAttribute("style", "")
        }
    }, [state])

    if (props.state) {
        return props.state ? <>
            <div className={props.isFull ? s.bg_1 : s.bg} onClick={() => { props.setState!(false); props.onClose(); }} />
            <div className={props.isFull ? s.container_full : s.container}>
                <Flex gap={"4"} onClick={() => setState(false)}>
                    <RiCloseLine />
                    <span>Close</span>
                </Flex>
                {props.children}
            </div></> : <div onClick={() => {
                props.setState!(true);
                router.push("?openModal", { scroll: false })
            }}>
            {props.disableChild}
        </div>
    } else {
        return state ? <>
            <div className={props.isFull ? s.bg_1 : s.bg} onClick={() => { props.setState!(false); props.onClose(); }} />
            <div className={props.isFull ? s.container_full : s.container}>
                <Flex gap={"4"} onClick={() => props.setState!(false)}>
                    <RiCloseLine />
                    <span>Close</span>
                </Flex>
                {props.children}
            </div></> : <div onClick={() => {
                props.setState!(true)
                router.push("?openModal", { scroll: false })
            }}>
            {props.disableChild}
        </div>

    }

}