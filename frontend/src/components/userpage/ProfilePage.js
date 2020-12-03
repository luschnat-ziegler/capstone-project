import {Link, useRouteMatch} from 'react-router-dom'

export default function ProfilePage() {
    return <>
        <h2>My Profile</h2>
        <ul>
            <li>
                <Link to={`${useRouteMatch().url}/data`}>User Data</Link>
            </li>
            <li>
                <Link to={`${useRouteMatch().url}/settings`}>Preferences</Link>
            </li>
        </ul>
    </>
}