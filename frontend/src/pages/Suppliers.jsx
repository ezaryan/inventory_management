import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Suppliers() {

    const [suppliers, setSuppliers] =
        useState([]);

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            phone: ""
        });

    const loadSuppliers = async () => {

        try {

            const response =
                await api.get("/suppliers");

            setSuppliers(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        loadSuppliers();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };

    const addSupplier = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/suppliers",
                form
            );

            setForm({
                name: "",
                email: "",
                phone: ""
            });

            loadSuppliers();

        } catch (error) {

            console.error(error);
        }
    };

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

                    <h1>Suppliers</h1>

                    <form
                        onSubmit={
                            addSupplier
                        }
                    >

                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={
                                handleChange
                            }
                        />

                        <button
                            type="submit"
                        >
                            Add Supplier
                        </button>

                    </form>

                    <hr />

                    <table
                        border="1"
                        cellPadding="10"
                    >

                        <thead>

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>

                        </thead>

                        <tbody>

                        {suppliers.map(
                            supplier => (

                            <tr
                                key={
                                    supplier.id
                                }
                            >

                                <td>
                                    {
                                        supplier.id
                                    }
                                </td>

                                <td>
                                    {
                                        supplier.name
                                    }
                                </td>

                                <td>
                                    {
                                        supplier.email
                                    }
                                </td>

                                <td>
                                    {
                                        supplier.phone
                                    }
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}

export default Suppliers;