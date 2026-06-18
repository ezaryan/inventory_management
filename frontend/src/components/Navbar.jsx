function Navbar() {

    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";
    };

    return (

        <div
            style={{
                background: "#333",
                color: "white",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <h2>
                Inventory Management System
            </h2>

            <button onClick={logout}>
                Logout
            </button>

        </div>

    );
}

export default Navbar;