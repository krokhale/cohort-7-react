import React, {useEffect, useState} from 'react';
import './App.css';

function ListItem(props) {


    console.log(props.theItem)

    return (
        <p>
            {props.theItem}
        </p>
    );
}

export default ListItem;
