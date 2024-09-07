import React, {useState, useEffect} from 'react';
import axios from 'axios';


const ApiRequestHandler = (url) => {
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [noData, setnoData] = useState(false)
    const [data, setdata] = useState([])


    useEffect(() => {
      ;(async () => {
        try {
            setloading(true)
            seterror(false)
            const response = await axios.get(url)
            setdata(response.data)
            console.log(response)
            setloading(false)
            if(response.status === 200 && !response.data.length){
                setnoData(true)
                return
            }
        } catch (error) {
            seterror(true)
            setloading(false)
        }
      })()
        
    }, [])
    
    return [loading, error, noData, data]

}

export default ApiRequestHandler;