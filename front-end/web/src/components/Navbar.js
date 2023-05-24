import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {

  const auth = localStorage.getItem("token");
  console.log(auth);

  return (
    auth? 
    <nav className="nav">
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/resident">Resident</CustomLink>
        <CustomLink to="/user">User</CustomLink>
        <CustomLink to="/logout">Logout</CustomLink>
      </ul>
    </nav>
    :
    <nav className="nav">
    <ul>
      <CustomLink to="/login">Login</CustomLink>
      <CustomLink to="/register">Register</CustomLink>
    </ul>
  </nav>

  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}