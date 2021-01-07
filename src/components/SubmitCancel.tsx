import React from 'react'

type Props = {
  ok?: string,
  cancel?: string
  onCancel: React.MouseEventHandler<HTMLButtonElement>
}

const SubmitCancel: React.FC<Props> = ({ ok = 'Submit', cancel = 'Cancel', onCancel }) =>
  <div className="form-group">
    <button className="btn btn-primary mr-3" type="submit">{ok}</button>
    <button className="btn btn-secondary" type="button" onClick={onCancel}>{cancel}</button>
  </div>

export default SubmitCancel