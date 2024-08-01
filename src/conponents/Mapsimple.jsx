import React,{useEffect,useState,useRef} from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup, Graticule, Annotation, Sphere } from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import Modal from "./Modal";
import { Tooltip } from "react-tooltip";
import MyTooltip from "./MyTooltip";
import { createPortal } from "react-dom";

//import {world} from "../world.json"
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"
const colorScale = scaleLinear().domain([0,7000000]).range(['#F6C28B', '#C6664C'])

export default function Mapsimple() {
    const [countries, setCountries] = useState([]);
    const [position, setPosition] = useState({coordinates:[0,0], zoom:1});
    const [selectedCountry, setSelectedCountry] = useState(false);
    const [content, setContent] = useState({
      name: '',
      population: '',
 
    })
    const [open, setOpen] = useState(false);
 
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
        //console.log(countries);
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
    function handleZoomIn() {
      if (position.zoom >= 4) return;
      setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
    }
  
    function handleZoomOut() {
      if (position.zoom <= 1) return;
      setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
    }
  
    function handleMoveEnd(position) {
      setPosition(position);
    }
   // console.log(position)
   // console.log(countries)
   // console.log(position.coordinates)
   // console.log(position.zoom)
  return (
    <>
    
    <div style={{width:'75vw', height:'75vh'}}>
    {/* <Tooltip id="My tooltip ID">{content}</Tooltip> */}
    <ComposableMap>
    {/* <div>{`This is ${content}`}</div> */}
   <ZoomableGroup 
   zoom={position.zoom}
   center={position.coordinates}
   onMoveEnd={handlemoveend}>
      <Geographies geography={geoUrl}  >
        
        {({ geographies }) =>
          geographies.map((geo,index) => {
            const isos = countries.find( (s)=> s.name === geo.properties.name)
            const pop = countries.find( (s)=> s.name === geo.properties.name)
            console.log(geo)
            
            return (
            <>
            
            {/* <MyTooltip tooltip={geo.properties.name}> */}
            <Geography key={geo.properties.name} geography={geo} title={geo.properties.name} 
                fill =  {  isos ? colorScale( isos["population_density"] ) : '#D4EAEE'}
                style={{
                
                hover: {
                  fill: "#9D79BC",
                },
                pressed: {
                  fill: "#8CA0D7",
                },
                border: 2
                
              }}
              onClick = { () => {
                //setSelectedCountry = true;
               //handleOpen()
                return (
                //    <Modal isOpen={open} onClose={handleClose}>
                //     <>
                //      <h3>A computer science portal!</h3>
                //     {geo.properties.name}
                //     </>
                //     </Modal>
                alert(`this is alert for  ${geo.properties.name} ${isos['population_density']}` )
                )
               // return (
                //     <div>
                //      {geo.properties.name}
                //     </div>
            //)
                                        }
            } 
            // onPointerEnter = { () => {
            //   //console.log(' enter')
            //   setOpen(true)
            //   return createPortal(
            //     <>
            //     <MyTooltip tooltip='This is new country'>
            //     <h1 className="mb-10 z-20 bg-slate-500 text-white">This is new</h1>
            //     </MyTooltip>
            //     </>, document.getElementById('countryinfo') 
            onPointerEnter = { () => {
              const name = geo.properties.name
              //const population =  isos['population_density']
              setContent({name: name, })
            }}
                
            //   //   <MyTooltip tooltip={geo.properties.name}> 
            //   //   </MyTooltip>
            //    )
            //   //setContent(`${geo.properties.name}`)
            //   //setSelectedCountry(true)
            // }}
            // onMouseLeave = { () => {
            //   //console.log('leave')
            //   //setContent('')
            //   setOpen(false)
            //   //setSelectedCountry(false)
            // }}
  //           data-tooltip-id={geo.id}
  // data-tooltip-content={geo.properties.name}
  
              
              />
              {/* </MyTooltip> */}
            </>
          )})
        }
      </Geographies>
     
    </ZoomableGroup>
    </ComposableMap>
    <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    

    </div>
    <div style={{
      padding: '20px',
      fontSize: '20px',
    }}>
      <h1>Current data for <span style={{
        fontWeight: 'bold',
        
      }}>{content.name}</span>  </h1> <br />
      
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
