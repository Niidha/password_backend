const Cart = require("../model/cart.model");

const addToCart = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || typeof id !== "number") {
            return res.status(400).send({ error: "Invalid product ID" });
        }

        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
            return res.status(404).send({ error: "Product not found" });
        }
        const product = await response.json();

        const existingCartItem = await Cart.findOne({ id });
        if (existingCartItem) {
            await Cart.updateOne({ id }, { $inc: { quantity: 1 } });
            return res.status(200).send({ message: "Product quantity updated in the cart" });
        } else {
            const newCartItem = {
                id,
                title: product.title,
                price: product.price,
                quantity: 1,
            };
            await Cart.create(newCartItem);
            return res.status(201).send({ message: "Product added to the cart", data: newCartItem });
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).send({ error: "An error occurred while adding to the cart" });
    }
};

const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        if (cartItems.length === 0) {
            return res.status(404).send({ message: "Cart is empty" });
        }
        return res.status(200).send(cartItems);
    } catch (error) {
        console.error("Error retrieving cart items:", error);
        return res.status(500).send({ error: "An error occurred while retrieving the cart" });
    }
};

const updateCart= async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
        return res.status(400).send({ error: "Quantity is required to update" });
    }

    try {
        const cartItem = await Cart.findById(id);
        if (!cartItem) {
            return res.status(404).send({ error: "Cart item not found" });
        }

        const updatedCartItem = await Cart.findByIdAndUpdate(id, 
            { 
                $set: { 
                    quantity: quantity, 
                    title: cartItem.title,  
                    price: cartItem.price   
                }
            }, 
            { new: true }
        );

        return res.status(200).send({
            message: "Cart item updated successfully",
            cartItem: updatedCartItem
        });
    } catch (error) {
        console.error("Error updating cart item:", error);
        return res.status(500).send({ error: "An error occurred while updating the cart item" });
    }
};

const removeCart = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await Cart.findById(id);
        if (!cartItem) {
            return res.status(404).send({ error: "Cart item not found" });
        }

        await Cart.deleteOne({ _id: id });

        return res.status(200).send({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        return res.status(500).send({ error: "An error occurred while deleting the cart item" });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCart,
};
