import React,{useEffect,useState,useRef} from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup, Graticule, Annotation, Sphere } from "react-simple-maps"
//import {world} from "../world.json"
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"

export default function Mapsimple() {
    const [countries, setCountries] = useState([]);
    const getData = ()=>{
        fetch('http://localhost:3004/countries', {
            headers: {'Content-Type':'application/json', 'Accept':'application/json'},
        })
        .then((response)=>response.json())
        .then((data) => setCountries(data))
    }
    useEffect(()=>{
        getData()
    },[])
   // console.log(countries)
  return (
    <>
    <ComposableMap>
   <ZoomableGroup>
      <Geographies geography={geoUrl}  >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} style={{
                default: {
                  fill: "#91C4F2",
                },
                hover: {
                  fill: "#9D79BC",
                },
                pressed: {
                  fill: "#8CA0D7",
                },
              }}/>
          ))
        }
      </Geographies>
    </ZoomableGroup>
    </ComposableMap>
    <div>
        <h1>Country List</h1>
        
        {countries.map((country,index)=>{
            return (
                <div key={index}>{country.name}</div>
            )
        })}
        {/* {countries.map((country, index)=>(
            <div key={index}>{country.name}</div>
        ))} */}
    </div>
    </>
  )
}
