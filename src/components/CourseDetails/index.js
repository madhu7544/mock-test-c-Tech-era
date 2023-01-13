import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {apiStatus: apiStateConstants.initial, courseData: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStateConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const courseUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(courseUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.course_details.name,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseData: updatedData,
        apiStatus: apiStateConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStateConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="desc">
        We cannot seem to find the page you are looking for
      </p>
      <button className="button" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseData} = this.state
    const {imageUrl, description, name} = courseData
    return (
      <div className="course-container">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="desc-container">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStateConstants.success:
        return this.renderSuccessView()
      case apiStateConstants.inProgress:
        return this.renderLoadingView()
      case apiStateConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-details-container">
        <Header />
        {this.renderCourseDetailsView()}
      </div>
    )
  }
}

export default CourseDetails
