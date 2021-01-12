import React from 'react'

type Props = {
    onAccept: (text: string) => void
    onCancel: () => void
}

const Edit: React.FC<Props> = ({ onAccept, onCancel }) => {

    const accept = (evt: React.SyntheticEvent<HTMLInputElement>) => {
        const em = evt.target as HTMLInputElement
        onAccept(em.value)
    }

    const input = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        switch (evt.key) {
            case 'Enter': return accept(evt)
            case 'Escape': return onCancel()
        }        
    }

    return (
        <input autoFocus onBlur={accept} className="flex-grow-1 mr-2 form-control" onKeyDown={input} type="text"></input>
    )
}

export default Edit