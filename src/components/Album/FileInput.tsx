import React from "react";
import { Extend } from "types";
import uploadSvg from 'images/cloud.svg'
import styled from "@emotion/styled";

const Label = styled.label`
    cursor: pointer;
`

type Props = {
    onPick: (files: File[]) => void
}

const FileInput: React.FC<Props & Extend<HTMLInputElement>> = ({ onPick, className, ...props }) => {
    const change: React.ChangeEventHandler = (evt) => {
        const em = evt.target as HTMLInputElement
        const filelist = em.files
        if (!filelist?.length) return;
        const files: File[] = []
        files.push.apply(files, filelist as any)
        onPick(files)
    }

    return (
        <Label className={'mb-0 ' + className}>
            <input type="file" className="d-none" onChange={change} {...props} />
            <img src={uploadSvg} alt="file-input-icon" width={40} />
        </Label>
    )
}

export default FileInput