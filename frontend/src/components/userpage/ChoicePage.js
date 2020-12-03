import {Link, useRouteMatch} from 'react-router-dom'

export default function ChoicePage() {
    return <>
        <p>You are currently not logged in</p>
        <ul>
            <li>
                <Link to={`${useRouteMatch().url}/login`}>Log In</Link>
            </li>
            <li>
                <Link to={`${useRouteMatch().url}/register`}>Register</Link>
            </li>
        </ul>
    </>
}