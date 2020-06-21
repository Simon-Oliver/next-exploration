const fetch = require("node-fetch")
import {useEffect, useState} from "react"

const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/user")
    const data = await res.json()
    console.log(data.temp)
    //return data.temp
} 


const Temp = () =>{
    const [temp, setTemp] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
        const interval = setInterval(async () => {
            const data = await fetchData()
            setTemp(() => data);
            setLoading(false);
          }, 1000);
          return () => clearInterval(interval);
            }
        }, [loading]);

setLoading(true);

   

    return( <p className="description">
          {temp}
        </p>)
  }
  
  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/user`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Temp