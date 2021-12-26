import React, { useEffect, useState } from 'react'

const ProfileStatusWihtHook = (props) => {
        let [editMode, setEditMode] = useState(false)
        let [status, setStatus] = useState(props.status)

        useEffect(() => {
            setStatus(props.status)
        }, [props.status])
        const activateEditeMode = () => {
            return setEditMode(true)
        }
        const deActivateEditeMode = () => {
            setEditMode(false)
            props.updateStatus(status)
        }
        const  onStatusChange = (e) => {
            setStatus( e.currentTarget.value )
            
        }
    return <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditeMode} >{props.status}</span>
                </div>}
            {editMode && <div>
                <input onChange={onStatusChange} autoFocus={true} type="text" onBlur={deActivateEditeMode} value={status} />
            </div>}
            {!status &&
            <button onClick={activateEditeMode} >status</button>}
        </div>
    
}
export default ProfileStatusWihtHook