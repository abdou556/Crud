import React from 'react'
import { useState, useEffect } from 'react';
import './ProductList.css'

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      description: '',
      quantity: '',
    });
    const [editingIndex, setEditingIndex] = useState(-1);
  
    useEffect(() => {
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(savedProducts);
    }, []);
  
    useEffect(() => {
      localStorage.setItem('products', JSON.stringify(products));
    }, [products]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const addProduct = () => {
      if (editingIndex === -1) {
        const newProduct = { ...formData };
        setProducts([...products, newProduct]);
      } else {
        
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = { ...formData };
        setProducts(updatedProducts);
        setEditingIndex(-1); 
      }
  
      
      setFormData({
        name: '',
        price: '',
        description: '',
        quantity: '',
      });
    };
  
    const deleteProduct = (index) => {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    };
  
    const editProduct = (index) => {
      const productToEdit = products[index];
      setFormData({ ...productToEdit });
      setEditingIndex(index);
    };
  
    return <>
      <div>
        <h1 className='d-flex justify-content-center align-items-center py-3 '> Product CRUD</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <button className=' btn btn-outline-danger m-3 ' onClick={() => deleteProduct(index)}>Delete</button>
                  <button className=' btn btn-outline-info m-3 ' onClick={() => editProduct(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>{editingIndex === -1 ? 'Add Product' : 'Edit Product'}</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <button type="button" className='btn btn-outline-info' onClick={addProduct}>
            {editingIndex === -1 ? 'Add' : 'Update'}
          </button>
        </form>
      </div>
      </>
}
