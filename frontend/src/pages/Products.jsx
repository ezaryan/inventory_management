import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Products() {


const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [suppliers, setSuppliers] = useState([]);

const [form, setForm] = useState({
    name: "",
    barcode: "",
    description: "",
    price: "",
    stockQty: "",
    categoryId: "",
    supplierId: ""
});
const [editingId, setEditingId] = useState(null);
const [image, setImage] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const loadProducts = async () => {

    try {

        const response =
            await api.get("/products");

        console.log(
            "Products:",
            response.data
        );

        console.log(
            "Count:",
            response.data.length
        );

        setProducts(response.data);

    } catch (error) {

        console.error(error);
    }
};


useEffect(() => {

    const fetchData = async () => {

        try {

            const productResponse =
                await api.get("/products");

            const categoryResponse =
                await api.get("/categories");

            const supplierResponse =
                await api.get("/suppliers");

            setProducts(
                productResponse.data
            );

            setCategories(
                categoryResponse.data
            );

            setSuppliers(
                supplierResponse.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    fetchData();

}, []);

const handleChange = (e) => {

    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
};

const addProduct = async (e) => {
     e.preventDefault();
     let imagePath = "";

if (image) {

    const formData = new FormData();

    formData.append(
        "file",
        image
    );

    const uploadResponse =
        await api.post(
            "/products/upload",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );

    imagePath = uploadResponse.data;
}
   

    try {

        if (editingId) {
    console.log("Updating Product", {
    name: form.name,
    barcode: form.barcode,
    description: form.description,
    price: Number(form.price),
    stockQty: Number(form.stockQty),
    category: {
        id: Number(form.categoryId)
    },
    supplier: {
        id: Number(form.supplierId)
    }
});

console.log("Image Path:", imagePath);
    await api.put(
        `/products/${editingId}`,
        {
            name: form.name,
            barcode: form.barcode,
            description: form.description,
            price: Number(form.price),
            stockQty: Number(form.stockQty),
            imagePath: imagePath,
            category: {
                id: Number(form.categoryId)
            },

            supplier: {
                id: Number(form.supplierId)
            }
        }
    );

} else {
    console.log("Image Path:", imagePath);
    await api.post(
        "/products",
        {
            name: form.name,
            barcode: form.barcode,
            description: form.description,
            price: Number(form.price),
            stockQty: Number(form.stockQty),
            imagePath: imagePath,
            category: {
                id: Number(form.categoryId)
            },

            supplier: {
                id: Number(form.supplierId)
            }
        }
    );
}
        alert(
            editingId
                ? "Product Updated Successfully"
        : "Product Added Successfully"
        );

        setForm({
            name: "",
            barcode: "",
            description: "",
            price: "",
            stockQty: "",
            categoryId: "",
            supplierId: ""
        });
        setEditingId(null);
        setImage(null);
        await loadProducts();

    } catch (error) {

        console.error(error);

        alert(
            editingId
                ? "Failed to Update Product"
                : "Failed to Add Product"
        );
    }
};
const editProduct = (product) => {

    console.log(product);

    setEditingId(product.id);

    setForm({
        name: product.name || "",
        barcode: product.barcode || "",
        description: product.description || "",
        price: product.price || "",
        stockQty: product.stockQty || "",
        categoryId: product.category?.id?.toString() || "",
        supplierId: product.supplier?.id?.toString() || ""
    });
};
const deleteProduct = async (id) => {

    const confirmDelete =
        window.confirm(
            "Are you sure you want to delete this product?"
        );

    if (!confirmDelete) {
        return;
    }

    try {

        await api.delete(
            `/products/${id}`
        );

        alert(
            "Product Deleted Successfully"
        );

        await loadProducts();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to Delete Product"
        );
    }
};
const filteredProducts = products.filter(
    (product) =>
        product.name
            ?.toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            ) ||
        product.barcode
            ?.toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            )
);
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
                    Products Management
                </h1>

                <form
                    onSubmit={addProduct}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: "350px"
                    }}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="barcode"
                        placeholder="Barcode"
                        value={form.barcode}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="stockQty"
                        placeholder="Stock Quantity"
                        value={form.stockQty}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.map(category => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}
                    </select>

                    <select
                        name="supplierId"
                        value={form.supplierId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Supplier
                        </option>

                        {suppliers.map(supplier => (

                            <option
                                key={supplier.id}
                                value={supplier.id}
                            >
                                {supplier.name}
                            </option>

                        ))}
                    </select>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />
                    <button type="submit"
                    onClick={addProduct}>
                    {editingId
                        ? "Update Product"
                        : "Add Product"}
                    </button>

                </form>

                <hr />

                <h2>Products List</h2>
<input
    type="text"
    placeholder="Search by Name or Barcode"
    value={searchTerm}
    onChange={(e) =>
        setSearchTerm(e.target.value)
    }
    style={{
        marginBottom: "15px",
        padding: "8px",
        width: "300px"
    }}
/>
                <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                >

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Barcode</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                        
                    </tr>

                    </thead>

                    <tbody>

                    {filteredProducts.length === 0 ? (

                        <tr>
                            <td colSpan="10">
                                No Products Found
                            </td>
                        </tr>

                    ) : (

                        filteredProducts.map(product => (

                            <tr key={product.id}>

                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.barcode}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stockQty}</td>
                                <td>
    {product.imagePath ? (
        <img
            src={`http://localhost:8080/uploads/images/${product.imagePath}`}
            alt={product.name}
            width="80"
            height="80"
            style={{
                objectFit: "cover",
                borderRadius: "5px"
            }}
        />
    ) : (
        "No Image"
    )}
</td>
                                <td>{product.category?.name}</td>
                                <td>{product.supplier?.name}</td>
                            
                                <td>

                                    <button
                                    type="button"
                                         onClick={() =>editProduct(product)}>
                                    Edit
                                    </button>

{" "}

<button
    type="button"
    onClick={() =>deleteProduct(product.id)
    }>
    Delete
</button>
                                    
                                </td>
                                
                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </div>
    </>
);


}

export default Products;
