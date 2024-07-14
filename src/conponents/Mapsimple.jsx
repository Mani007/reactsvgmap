import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
//import {world} from "../world.json"
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"

export default function Mapsimple() {
  return (
    <ComposableMap>
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
    </ComposableMap>
  )
}
