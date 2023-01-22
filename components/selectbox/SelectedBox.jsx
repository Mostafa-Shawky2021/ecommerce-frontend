import React, { useState, useEffect, useRef } from 'react';

import style from './selectedbox.module.scss';

const SelectedBox = ({ children, onChange }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [chosenText, setChosenText] = useState('')
    const [chosenValue, setChosenValue] = useState('')

    const selectboxRefWrapper = useRef(null)
    const optionsWrapperRef = useRef(null)

    const handleChosen = event => {
        if (event.currentTarget !== event.target) {
            const selectedText = event.target.innerText
            const selectedValue = event.target.getAttribute('value')
            setChosenText(selectedText)
            setChosenValue(selectedValue);
            onChange && onChange(chosenValue)
        }
    }
    useEffect(() => {
        const optionsWrapperHeight = optionsWrapperRef.current.scrollHeight;
        if (menuOpen) {
            optionsWrapperRef.current.style.height = `${optionsWrapperHeight}px`
        } else {
            optionsWrapperRef.current.style.height = '0px'

        }
    }, [menuOpen])

    useEffect(() => {
        const initialText = optionsWrapperRef.current.children[0].innerText
        setChosenText(initialText)
        const closeMenuOnKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
        const closeMenuOnMouseClick = (event) => {
            if (!selectboxRefWrapper.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }

        document.body.addEventListener('keydown', closeMenuOnKeyDown)
        document.body.addEventListener('click', closeMenuOnMouseClick)

        return () => {
            document.body.removeEventListener('keydown', closeMenuOnKeyDown)
            document.body.removeEventListener('click', closeMenuOnMouseClick)
        }
    }, [])


    return (
        <div className={style.selectBox} ref={selectboxRefWrapper} onClick={() => setMenuOpen(!menuOpen)}>
            <div className={style.chosenValue}>{chosenText}</div>
            <div
                className={style.optionsWrapper}
                ref={optionsWrapperRef}
                onClick={handleChosen}
            >
                {children}
            </div>

        </div>

    )
}

export default SelectedBox
