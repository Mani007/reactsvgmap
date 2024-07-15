import React,{useEffect,useState,useRef} from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup, Graticule, Annotation, Sphere } from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import Modal from "./Modal";
//import {world} from "../world.json"
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"
const colorScale = scaleLinear().domain([0,7000000]).range(['#F6C28B', '#C6664C'])

export default function Mapsimple() {
    const [countries, setCountries] = useState([]);
    const [position, setPosition] = useState({coordinates:[0,0], zoom:1});
    const [selectedCountry, setSelectedCountry] = useState(false);
    const [content, setContent] = useState('')
    const [open, setOpen] = React.useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };
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
    const handlemoveend = (e) => {
        setPosition({
            coordinates: e.center,
            zoom: e.zoom
        })
    }
    // const handleenter = (geo) => {
    //     setSelectedCountry = true;
    //     return (
    //        <Modal>
    //         {geo.properties.name}
    //         </Modal>
    //     )
    // }
    const handleleave = (geo) => {
        setSelectedCountry = false;
        return ( selectedCountry &&
           <Modal>
            {geo.properties.name}
            </Modal>
        )
    }
   // console.log(position)
   // console.log(countries)
   // console.log(position.coordinates)
   // console.log(position.zoom)
  return (
    <>
    <div style={{width:'90vw', height:'90vh'}}>
    <ComposableMap>
   <ZoomableGroup 
   zoom={position.zoom}
   center={position.coordinates}
   onMoveEnd={handlemoveend}>
      <Geographies geography={geoUrl}  >
        {({ geographies }) =>
          geographies.map((geo,index) => {
            const isos = countries.find( (s)=> s.name === geo.properties.name)
            //console.log(isos)
            return (<Geography key={geo.rsmKey} geography={geo} 
                fill =  {  isos ? colorScale( isos["population_density"] ) : '#D4EAEE'}
                style={{
                
                hover: {
                  fill: "#9D79BC",
                },
                pressed: {
                  fill: "#8CA0D7",
                },
              }}
              onClick = { () => {
                //setSelectedCountry = true;
               handleOpen()
                return (
                   <Modal isOpen={open} onClose={handleClose}>
                    <>
                     <h3>A computer science portal!</h3>
                    {geo.properties.name}
                    </>
                    </Modal>
                )
               // return (
                //     <div>
                //      {geo.properties.name}
                //     </div>
            //)
                                        }
            } 
              
              />
          )})
        }
      </Geographies>
     
    </ZoomableGroup>
    </ComposableMap>
    </div>
    <div>
        {/* <h1>Country List</h1>
        
        {countries.map((country,index)=>{
            return (
                <div key={index}>{country.name}</div>
            )
        })} */}
        {/* {countries.map((country, index)=>(
            <div key={index}>{country.name}</div>
        ))} */}
    </div>
    </>
  )
}
