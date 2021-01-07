import React from "react";
import { Extend } from "types";
import { space, SpaceProps } from 'styled-system'
import styled from '@emotion/styled'

type Props = {
    label: string
    onPick: (file: File) => void
}

const FileInput: React.FC<Props & Extend<HTMLInputElement>> = ({ onPick, className, label, ...props }) => {
    const change: React.ChangeEventHandler = (evt) => {
        const em = evt.target as HTMLInputElement
        const filelist = em.files
        if (!filelist?.length) return;
        onPick(filelist[0])
    }

    return (
        <label className={"mb-0 " + className}>
            <input type="file" className="d-none" onChange={change} {...props} />
            <span className="btn btn-secondary">{label}</span>
        </label>
    )
}

export default styled(FileInput)<SpaceProps>(space);