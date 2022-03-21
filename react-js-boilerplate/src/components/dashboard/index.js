import React, { useState, useEffect } from "react";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import mapService from "../../services/mapService";
import ReactTooltip from "react-tooltip"
import Loader from "../shared/loader"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  
// let markers = [];

const Dashboard = () => {

  const [markers, setMarkers] = useState([]);

  // Filters
  const [status, setStatus] = useState( '', '' );
  const [endDate, setEndDate] = useState( '');
  const [startdate, setStartDate] = useState( '');
  const [agencyName, setAgencyName] = useState( '');
  const [showLoader, setShowLoader] = useState( '');

  // Configuration
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [isWindowOpen, setIsWindowOpen] = useState( '', '' );

  useEffect( () => {
    getLaunches();
  }, [] );

  useEffect(() => {
    ReactTooltip.rebuild();
});

  async function getLaunches(params = null) {
    setShowLoader(true);
    const apiPath = "/launch/upcoming/";
    const queryParams = {...params, limit: 10 }

    const data = await mapService.getData(apiPath, queryParams);
    if (data.data.results.length > 0) {
      setShowLoader(false);
    }
  
    const launchesList = data?.data?.results?.map(launch => {
      return {
        name: launch.name,
        launchPad: launch.pad.name,
        coordinates: [launch.pad.longitude, launch.pad.latitude],
        agencies: launch.launch_service_provider.name,
        timeOfLaunch: launch.window_start
      }
    });

    const groupedData = groupArrayOfObjects(launchesList, 'coordinates');
    setMarkers(groupedData);
  }

  function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleStartDate(date) {
    setStartDate(date.target.value);
  }

  function handleEndDate(date) {
    setEndDate(date.target.value);
  }

  function handleAgencyName(name) {
    setAgencyName(name.target.value);
  }

  function handleStatus(status) {
    setStatus(status.target.value);
  }

  function handleInfoWindow(isOpen) {
    setIsWindowOpen(isOpen.target.value);
  }

  const handleApplyClick = () => {
    getLaunches({search: agencyName, status: status });
  }

  const handleResetClick = () => {
    getLaunches(null);
    clearSate();
  }

  const clearSate = () => {
    setAgencyName('');
    setStatus('');
  }

  return (
    <div>
      {/* <LoaderContext.Consumer>
      {({loading, data}) => (
      !!loading && <loader />
      )}
      </LoaderContext.Consumer> */}
      {showLoader &&  <Loader/>}

    
      <ReactTooltip id="launch" multiline={true}/>
      <div className="controls">
        <input type="text" className="ms-2 form-control" placeholder="Agency Name" value={agencyName} onChange={handleAgencyName}></input>
        <input type="text" className="ms-2 form-control" placeholder="Status" value={status} onChange={handleStatus}></input>
        <button className="ms-2 btn btn-success" onClick={() => handleApplyClick()}>Apply</button>
        <button className="ms-2 btn btn-danger" onClick={() => handleResetClick()}>Reset</button>
      </div>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [58, 20, 0],
          scale: 400
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl} >
            {({ geographies }) =>
              geographies
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                    />
                    ))
                  }
          </Geographies>
          {Object.keys(markers).map( markerKey => (
            <Marker key={markerKey} coordinates={markerKey.split(',')}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text className="mt-2"
                textAnchor="middle"
                style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "6px" }}
                >

                {/* <ul> */}
                  {markers[markerKey].map((launch, index) => {
                    return (
                    <a data-for="launch" 
                      data-tip={`Name: ${launch.name} <br/> Name of the launch pad: ${launch.launchPad} <br/> Time of launch: ${launch.timeOfLaunch} <br/> Agencies: ${launch.agencies}`}>
                      {launch.name}</a>
                    // <li key={ index }
                    //   data-tip={`Name: ${launch.name} <br/> Agencies: ${launch.agencies} <br/> Name of the launch pad: ${launch.launchPad} <br/> Time of launch: `}>
                    // {launch.name}</li>
                  )}
                  )}
                  {/* </ul> */}
                
          </text>
            </Marker>
          ))}
         
        </ZoomableGroup>
      </ComposableMap>
      <div className="zoom">
      <button className="ms-3 btn btn-info" onClick={handleZoomIn}> Zoom In </button>
        <button className="ms-3 btn btn-info" onClick={handleZoomOut}> Zoom Out </button>
      </div>
    </div>

  );
};

export default Dashboard;
