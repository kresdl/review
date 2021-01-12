import React from 'react'

type Props = {
    onAccept: (text: string) => void
    onCancel: () => void
    initial?: string
}

const Edit: React.FC<Props> = ({ onAccept, onCancel, initial }) => {

    const accept = (evt: React.SyntheticEvent<HTMLInputElement>) => {
        const { value } = evt.target as HTMLInputElement
        if (!value) return
        onAccept(value)
    }

    const input = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        switch (evt.key) {
            case 'Enter': return accept(evt)
            case 'Escape': return onCancel()
        }        
    }

    return (
        <input required autoFocus onBlur={accept} className="flex-grow-1 mr-2 form-control" onKeyDown={input} type="text" defaultValue={initial}></input>
    )
}

export default Edit