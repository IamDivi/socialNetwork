import React from 'react'

class ProfileStatus extends React.Component {
    
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditeMode = () => {
        
        this.setState({
            editMode: true
        })
    }
    deActivateEditeMode = () => {
        
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value 
        })
    }
    handleFocus = (event) => event.target.select()
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status){
        this.setState({
            status: this.props.status
        })}
    }
    render() {
        return <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditeMode} >{this.props.status}</span>
                </div>}
            {this.state.editMode && <div>
                <input onChange={this.onStatusChange} autoFocus={true} onFocus={this.handleFocus} onBlur={this.deActivateEditeMode} type="text" value={this.state.status} />
            </div>}
        </div>
    }
}
export default ProfileStatus