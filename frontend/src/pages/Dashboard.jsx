import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response =
                    await api.get("/dashboard");

                setStats(response.data);

            } catch (error) {

                console.error(error);
            }
        };

        fetchDashboard();

    }, []);

    if (!stats) {

        return (
            <>
                <Navbar />

                <div
                    style={{
                        display: "flex"
                    }}
                >
                    <Sidebar />

                    <div
                        style={{
                            padding: "20px"
                        }}
                    >
                        <h2>Loading...</h2>
                    </div>

                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div
                style={{
                    display: "flex"
                }}
            >
                <Sidebar />

                <div
                    style={{
                        padding: "20px",
                        flex: 1
                    }}
                >

                    <h1>
                        Inventory Dashboard
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",
                            marginTop: "20px"
                        }}
                    >

                        <div
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                minWidth: "200px"
                            }}
                        >
                            <h3>Total Products</h3>

                            <h2>
                                {stats.totalProducts}
                            </h2>
                        </div>

                        <div
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                minWidth: "200px"
                            }}
                        >
                            <h3>Total Categories</h3>

                            <h2>
                                {stats.totalCategories}
                            </h2>
                        </div>

                        <div
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                minWidth: "200px"
                            }}
                        >
                            <h3>Total Suppliers</h3>

                            <h2>
                                {stats.totalSuppliers}
                            </h2>
                        </div>

                        <div
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                minWidth: "200px"
                            }}
                        >
                            <h3>Total Transactions</h3>

                            <h2>
                                {stats.totalTransactions}
                            </h2>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;