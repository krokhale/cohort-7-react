import React, {useEffect, useState} from 'react';
import './App.css';

function Button(props) {


    console.log(props)

    return (
        <button style={{padding: '10px', background: props.background || 'blueviolet', border: '0px', minWidth: '75px', borderRadius: '10px', color: '#fff',}}>{props.buttonText}</button>
    );
}

export default Button;
