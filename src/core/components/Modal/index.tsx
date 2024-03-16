"use client"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import s from "./index.module.scss";
import { useRouter } from "next/navigation";


interface Props {
    onClose: () => void,
    disableChild: ReactNode,
    children?: ReactNode,
    isFull?: boolean,
    state?: boolean,
    setState?: Dispatch<SetStateAction<boolean>>
}


export default function AppModal(props: Props) {

    const [state, setState] = useState(props.state ?? false)
    const router = useRouter()


    useEffect(() => {
        window.addEventListener('popstate', () => {
            props.state ? props.setState!(false) : setState(false)
        });

        if (state) {
            document.body.scrollTo({ top: 0 })
            document.body.setAttribute("style", "height:95vh; overflow: hidden;")
        } else {
            document.body.setAttribute("style", "")
        }
    }, [])

    if (props.state) {
        return props.state ? <>
            <div className={props.isFull ? s.bg_1 : s.bg} onClick={() => { props.setState!(false); props.onClose(); }} />
            <div className={props.isFull ? s.container_full : s.container}>
                {props.children}
            </div></> : <div onClick={() => {
                props.setState!(true);
                router.push("?openModal='deactivate'", { scroll: false, })
            }}>
            {props.disableChild}
        </div>
    } else {
        return state ? <>
            <div className={props.isFull ? s.bg_1 : s.bg} onClick={() => { setState!(false); props.onClose(); }} />
            <div className={props.isFull ? s.container_full : s.container}>
                {props.children}
            </div></> : <div onClick={() => {
                setState!(true)
                router.push("?openModal='deactivate'", { scroll: false })
            }}>
            {props.disableChild}
        </div>

    }

}