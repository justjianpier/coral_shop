export const getProductsById = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)

    if(!response.ok) {
        throw new Error("An error occurred");
    }

    return response.json()
}