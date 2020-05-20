import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './components/MainComponent';
import './styles/styles.scss';

ReactDOM.render(
    <React.StrictMode>
        <MainComponent />
    </React.StrictMode>,
    document.getElementById('root')
);