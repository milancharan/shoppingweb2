import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ClearFilterButton from './ClearFilterButton'
// import ProductDets from './ProductDets'
import { useNavigate } from 'react-router-dom'
// import Data from "../assets/Data.json"

export default function Products() {

    const [filters, setFilters] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('./assets/Data.json')
            .then(resp => {
                setProducts(resp.data)
                setProductsFiltered(resp.data)
            })
            .catch(err => {
                console.log('Error : ', err);
            })
    }, [])

    // const pushFilters = () => {
    //     const myFilters = document.getElementsByName('filter')
    //     for(let i=0; i<myFilters.length; i++){
    //         if(myFilters[i].checked){
    //             setFilters([...filters, myFilters[i].id])
    //             // console.log(myFilters[i].id);
    //             // console.log(myFilters[i].checked);
    //             // console.log(myFilters[i+1].checked);
    //             // console.log(myFilters[i+1]);
    //         }
    //     }
    //     console.log(filters);
    // }\

    const manageFilter = e => {
        const filterName = e.target.value
        setFilters(filterName)
        // console.log("Filter managed");

        if (filterName === 'ascending') {
            setProductsFiltered([...products].sort((a, b) => a.price-b.price))
            // console.log('ordered Ascending', productsFiltered);
        } else if (filterName === 'descending') {
            setProductsFiltered([...products].sort((a, b) => b.price-a.price))
            // console.log('ordered Descending');
        } else if (filterName === 'fastDelivery') {
            setProductsFiltered(products.filter(product => product.delivery === 'fast'))
            // console.log('ordered FastDelivered');
        } else if (filterName === 'outOfStock') {
            setProductsFiltered(products.filter(product => product.stock === 0))
            // console.log('ordered OutStocked');
        } else {
            setProductsFiltered(products)
        }

        // console.log(products);
        // console.log('ordered Ascending', productsFiltered);

        // return productsFiltered
    }

    // useEffect(()=>{
    //     // const filter = e.target.value
    //     // console.log(filter);
    //     // setFilters([...filters, filter])
    //     // console.log(filters);
    //     // setProductsFiltered([...products])

    //     if(filters.includes('outOfStock')){
    //         setProductsFiltered(products.filter(product => product.stock===0))
    //     } 
    //     if (filters.includes('ascending')){
    //         setProductsFiltered(products.Sort((i, j) => i.price - j.price))
    //     } 
    //     if (filters.includes('fastDelivery')){
    //         setProductsFiltered(products.filter(product => product.delivery === 'fast'))
    //     } 
    //     if( filters.includes('descending')) {
    //         setProductsFiltered(products.Sort((i, j) => j.price -i .price))
    //     }  
    //     if( filters.includes('allProducts')) {
    //         setProductsFiltered([...products])
    //     }  
    // },[filters])

    const manageClear = () => {
        setFilters(null)
        setProductsFiltered(products)
        console.log("Filters Cleared");
    }

    const manageClick = e => {
            navigate(`/product/${e}`)
            console.log(e);
    }


    return (
        <div className='container col'>
            <div className='col-3'>
                <label>Filter Products</label>
                <select id='filters' value={filters} onChange={manageFilter} className='sort-selection--style'>
                    <option selected>--Select--</option>
                    <option value='#' disabled></option>
                    <option value="ascending">Ascending</option>
                    <option value="#" disabled></option>
                    <option value="descending">Descending</option>
                    <option value="#" disabled></option>
                    <option value='outOfStock'>Out Of Stock</option>
                    <option value='#' disabled></option>
                    <option value='fastDelivery'>Fast Delivery</option>
                </select>
                <ClearFilterButton manageClear={manageClear} />
                {/* <form className='col-6'>
                <label><input type='checkbox' name='filter' id='allProducts' value='allProducts' /> All Products</label>
                <label><input type='checkbox' name='filter' id='ascending' value='ascending' /> Ascending</label>
                <label><input type='checkbox' name='filter' id='descending' value='descending'  /> Descending</label>
                <label><input type='checkbox' name='filter' id='outOfStock' value='outOfStock'  /> Out Of Sctock</label>
                <label><input type='checkbox' name='filter' id='fastDelivery' value='fastDelivery' /> Fast Delivery</label>
                <button type='button' onClick={pushFilters}>Show Products</button>
            </form> */}
            </div>
            <div className='row'>
                {productsFiltered.map((p, i) => (
                    <div className='col-sm alig mb-2 p-2 m-1 border border-dark border-radius-4 text-center' onClick={() => manageClick(p.id)}>
                        <img src={p.image} width='200' height={250} alt='...' />
                        <h6 className='mt-4'>{p.title}</h6>
                        <p>Price : &#36; <del><i>{p.price * 2}</i></del> {p.price}</p>
                        <p>Rating: {p.rating.rate}&#9733; <span>{p.rating.count} ratings</span></p>
                        <button type='button' >know more</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
