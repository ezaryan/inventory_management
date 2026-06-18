import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            style={{
                width: "220px",
                minHeight: "100vh",
                background: "#f4f4f4",
                padding: "20px"
            }}
        >

            <h3>Menu</h3>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0
                }}
            >
                <li>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/products">
                        Products
                    </Link>
                </li>

                <li>
                    <Link to="/categories">
                        Categories
                    </Link>
                </li>

                <li>
                    <Link to="/suppliers">
                        Suppliers
                    </Link>
                </li>
            </ul>

        </div>

    );
}

export default Sidebar;