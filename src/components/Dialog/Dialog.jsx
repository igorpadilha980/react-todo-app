import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import CloseIcon from '@mui/icons-material/CloseSharp';

import style from './Dialog.module.css'

const Dialog = forwardRef(function Dialog({ children, closeAction, className, ...inlineCss }, ref) {
    const dialogRef = useRef(null)
    const contentRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            open: () => dialogRef.current?.show(),
            openModal: () => dialogRef.current?.showModal(),
            close: () => dialogRef.current?.close()
        }
    }, [])

    useEffect(() => {
        return dialogRef.current.addEventListener('click', (clickEvent) => {
            if (!dialogRef.current.open)
                return

            const content = contentRef.current
            const target = clickEvent.target

            if (!content.contains(target))
                dialogRef.current.close()
        })
    }, [])

    return (
        <dialog ref={dialogRef} className={style.dialog}>
            <section ref={contentRef} className={(className? ` ${className} ` : '') + style.contentWrapper} style={inlineCss}>
                {closeAction &&
                    <button className={style.closeDialog} onClick={closeAction}>
                        <CloseIcon fontSize="medium" />
                    </button>}
                {children}
            </section>
        </dialog>
    )
})

export default Dialog