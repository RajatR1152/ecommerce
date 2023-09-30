'use client'
import FormatPrice from '@/components/FormatPrice';
import Quantity from '@/components/Quantity';
import Rating from '@/components/Rating';
import { DataContext } from '@/context/DataContext'
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { checkOut } from '@/app/checkOut';
import React, { useContext, useEffect, useState } from 'react'

export default function page() {

    const router = useRouter();
    const { data, setData, data2, setData2, quantity, setQuantity } = useContext(DataContext);
    const [productData, setProductData] = useState({});
    const { userData, setUserData } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);
    const param = useParams();


    useEffect(() => {

        axios.get('https://dummyjson.com/products').then((res) => {
            setData2(res.data.products);
        })

        const d = JSON.parse(localStorage.getItem('user'));
        setUserData(d);

        data2.map((d) => {
            if (param.product.replace('%20', " ") == d.title) {
                setProductData(d);
                setImages(d.images);
                console.log(d.title)
            }
        });

    }, [])

    console.log("name : ", userData)

    function addToCart(d) {

        d.user = userData.username;

        axios.post('https://ecommerce-ffvg.vercel.app/cart', d).then((res) => {
            console.log(res)
            router.push('/cart');
        })
    }

    function buyNow(d) {
        d.user = userData.username;

        console.log(d);
        axios.post('https://ecommerce-ffvg.vercel.app/placed', d).then((res) => {
            console.log(res);
            router.push('/orders');
        });
        checkOut({
            lineItems: [{
                price: d.price,
                quantity: d.quantity
            }]
        });
    }

    return (
        <div className="container flex overflow-y-auto md:flex-row flex-col w-full h-screen">
            <div className="container w-full md:w-5/12 flex flex-col md:flex-row h-fit md:h-screen p-5">
                <div className="container h-full overflow-y-auto w-full flex md:flex-col flex-row gap-5 md:w-3/12 p-5 bg-slate-50">
                    {
                        images.map((i, index) => {
                            return <img key={index} onClick={() => { setImgIndex(index) }} className='md:w-40 md:h-40 cursor-pointer w-14 h-14 ' src={i} alt="" />
                        })
                    }
                </div>
                <div className="container w-full flex flex-col items-center justify-center md:w-9/12 p-5 bg-slate-50">
                    <img src={images[imgIndex]} alt="" className="w-full h-auto" />
                </div>
            </div>
            <div className="container w-full md:w-7/12  h-fit p-5">
                <div className="container w-full h-screen overflow-y-auto bg-slate-50 p-5">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-700">{productData.title}</h1>
                    <Rating stars={3} />


                    <ul>
                        <li className='my-5 text-xl font-bold'><h5>brand : {productData.brand}</h5></li>
                        <li className='my-5 text-xl font-bold'><h5>category : {productData.category}</h5></li>
                        <li className='my-5 text-xl font-bold'><h5>description :  <br /><p className="text-lg my-5 md:ms-10 ms-0 w-full md:w-6/12">{productData.description}</p></h5></li>
                        <li className="my-2 text-xl font-bold">{productData.stock < 0 ? "out of stock" : `${productData.stock} items available`}</li>
                        <li className='mt-5 text-xl font-bold'><h3>price: <s className='text-red-500'><FormatPrice price={productData.price / (1 - productData.discountPercentage / 100)} /></s> <i className='fs-4 text-danger'>{productData.discountPercentage}% off</i></h3></li>
                        <li className='my-3 text-xl font-bold mx-5'><h3><FormatPrice price={productData.price} /></h3></li>
                    </ul>
                    <h5 className='my-5 text-xl font-bold'>Quantity:</h5>

                    <Quantity />

                    <hr />
                    <button onClick={() => { addToCart(productData) }} className="w-full p-3 my-5 rounded-md bg-violet-800 text-white text-xl font-bold">add to cart</button>
                    <button onClick={() => { buyNow(productData) }} className="w-full p-3 my-5 bg-transparent border-2 border-violet-800 rounded-md hover:bg-violet-800 text-violet-800 hover:text-white text-xl font-bold">buy now</button>
                    <hr />


                </div>
            </div>
        </div>
    )
}
