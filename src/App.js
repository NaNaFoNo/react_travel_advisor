import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api/index'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {
    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0}); 
    const [bounds, setBounds] = useState({});
    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.onload = navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() =>{
        if (bounds) {
            setIsLoading(true);
            getPlacesData(bounds.sw, bounds.ne) // bounds.sw, bounds.ne  if datasets are passed on page setup nothing happened. when deleted page loads, when passing in it works ?!?!
                .then((data) => {
                    setPlaces(data);
                    setIsLoading(false);
                })
            }
    }, [coordinates, bounds]);
        
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ widht: '100%'}}> 
                <Grid item xs={12} md={4}>
                    <List places= {places} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setBounds={setBounds}
                        setCoordinates={setCoordinates}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;