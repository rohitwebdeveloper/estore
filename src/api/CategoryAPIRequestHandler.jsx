import React, { useState, useEffect } from "react";
import axios from "axios";
import apiurl from "./apiConfig";

const CategoryAPIRequestHandler = (category) => {

    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [noData, setnoData] = useState(false)
    const [data, setdata] = useState([])


    useEffect(() => {
        ; (async () => {
            try {
                setloading(true)
                seterror(false)
                const response = await axios.get(`${apiurl}/api/products/category/${category}`)
                setdata(response.data.categoryProducts)
                console.log(response)
                setloading(false)
                if (response.status === 200 && !response.data.categoryProducts.length) {
                    setnoData(true)
                    return
                }
            } catch (error) {
                console.error(error)
                seterror(true)
                setloading(false)
            }
        })()
    }, [])

    return [loading, error, noData, data]

}

export default CategoryAPIRequestHandler;