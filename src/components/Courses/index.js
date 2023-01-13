import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {details} = props
  const {logoUrl, name, id} = details
  return (
    <Link to={`courses/${id}`}>
      <li className="list">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default Courses
