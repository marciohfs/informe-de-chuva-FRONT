import React from "react";
import Form from "../form/Form";

export default function Buttons() {
    const [show, setShow] = React.useState(false);

    const handleClick = () => {
        setShow(currentShow => !currentShow);      
    }

    return (
        <div className="buttonshow">
        <button onClick={handleClick} class="slds-button slds-button_neutral slds-button_stretch slds-text-heading_medium">
            Informar Chuva
        </button>
            {show ? <div id="form1" className="form1"> 
                <br />        
                <Form />
            </div> :null}
        </div>
    )
}