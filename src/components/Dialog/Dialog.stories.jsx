import { useRef } from "react"

import Dialog from "./Dialog"

import { Button } from "../Button"

const Wrapper = () => {
    const ref = useRef(null)

    return (
        <>
            <Dialog ref={ref} closeAction={() => ref.current.close()} >
                <h1>Dialog children</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <Button>Action</Button>
            </Dialog>
            <Button action={() => ref.current.openModal()}>Open dialog</Button>
        </>
    )
}

const meta = {
    component: Dialog,
    render: (args) => <Wrapper {...args} />
}

export default meta

export const Primary = {}