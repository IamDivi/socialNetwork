import React from "react"
import Profile from "./Profile"
import { connect } from "react-redux"
import { getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile } from "../../profile-reducer"
import { withRouter } from "react-router-dom"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"


class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
    }

    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }
  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.match.params.userId}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile} />

    )
  }

}

const mapStateToProps = (state) => ({
  profile: state.profileState.profile,
  status: state.profileState.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth

})
// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile }),
  withRouter)(ProfileContainer)