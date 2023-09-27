import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {store} from '../redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react';

function MyApp( { Component,pageProps}) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
    <Provider store={store()} >
        <Component {...pageProps} />
    </Provider>
    )
}

export default MyApp