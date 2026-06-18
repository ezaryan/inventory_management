import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Categories() {

    const [categories, setCategories] =
        useState([]);

    const [name, setName] =
        useState("");

    const loadCategories = async () => {

        try {

            const response =
                await api.get("/categories");

            setCategories(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        loadCategories();

    }, []);

    const addCategory = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/categories",
                {
                    name
                }
            );

            setName("");

            loadCategories();

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

                    <h1>Categories</h1>

                    <form
                        onSubmit={
                            addCategory
                        }
                    >

                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            type="submit"
                        >
                            Add Category
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
                        </tr>

                        </thead>

                        <tbody>

                        {categories.map(
                            category => (

                            <tr
                                key={
                                    category.id
                                }
                            >

                                <td>
                                    {
                                        category.id
                                    }
                                </td>

                                <td>
                                    {
                                        category.name
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

export default Categories;