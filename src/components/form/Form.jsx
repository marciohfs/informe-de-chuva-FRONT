import React from "react";
//import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";
import './form.css';
import InputField from "../inputs/inputs";

export default function Form() {
    const now = new Date();
    const [inputValue, setInputValue] = React.useState({ 
        data_ano: dateFormat(now, "UTC:yyyy"), 
        data_dia: "",
        hora: "",
        cod_porteiro: "",
        uslmm: "",
        fstmm: "",
        boamm: "",
        empmm: ""
    });
    const { data_ano, data_dia, hora, cod_porteiro, uslmm, fstmm, boamm, empmm } = inputValue;
    const [portdata, setPortdata] = React.useState([{}]);
    const form = React.useRef();   
    const portnom = React.useRef();
    const datadia2 = React.useRef();

    //Traz o Porteiro após digitar o Cód. do Porteiro e erro no campo caso cód. inválido
    const handleBlur = (event) => {
        event.preventDefault()
        try{
            if (!cod_porteiro) {
                return res.status(404).json();
            } else {
                let res = fetch(`http://staluciaweb:5001/chuvaUSL/${cod_porteiro}`)
                    .then(res => res.json())
                    .then(data => setPortdata(data))
                if (res.rows.length < 1) {
                    return res.status(404).json();
                }
            }
        } catch { 
            const inputPort = document.getElementById("codport");
            inputPort.focus();
            document.getElementById("divport").classList.add("slds-has-error");
            document.getElementById("error-message-id-49").classList.remove("slds-hidden");
            document.getElementById("nomePort").classList.add("slds-hidden");
        }
    }

    //Salva as alterações e valores de cada input        
    const handleChange = (event) => {
        const { name, value, maxLength } = event.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: maxLength === 3 ? value.replace(/\D/g, '') : value
        }));
      };

    //Submit do FORM para a API
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {         
            let res = await fetch('http://staluciaweb:5001/addChuvaUSL', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    data_ano: data_ano,
                    data_dia: data_dia,
                    hora: hora,
                    cod_porteiro: cod_porteiro,
                    uslmm: uslmm,
                    fstmm: fstmm,
                    boamm: boamm,
                    empmm: empmm,
                    portnome: portnom.current.value,
                    data_dia2: datadia2.current.value
                })
            })
            let resJson = await res.json();
            if (res.status === 200) {
                //Envia o E-mail
                //emailjs.sendForm('service_ji2i9yp', 'template_9mpwdn3', form.current, 'V5m1MJQi4VnZsxZSN')
                setInputValue({ 
                    data_dia: "",
                    hora: "",
                    cod_porteiro: "",
                    uslmm: "",
                    fstmm: "",
                    boamm: "",
                    empmm: ""
                })
                alert("Registro gravado com sucesso!")
                // console.log(inputValue)
                // console.log(portnom.current.value, datadia2.current.value)
                //Da refresh na página
                history.go(0);
            } else {  
                alert("Data já cadastrada!")
                //Da refresh na página
                history.go(0);  
            }
        } catch (err) {
            console.log(err)
            alert("Data já cadastrada!!!")
            //Da refresh na página
            history.go(0);
        }
    }

    return (
        <form onSubmit={handleSubmit} class="slds-align_absolute-center slds-text-body_medium" ref={form}>
            {portdata.map(portdt => (
            <div class="slds-box slds-box_x-large  slds-theme_shade" key={portdt.NUMERO}>
                <div class="slds-grid slds-gutters">   
                    <div class="slds-col slds-size_1-of-2">
                        <InputField 
                            type="date"
                            value={data_dia}
                            label="Data:"
                            name="data_dia"
                            onChange={handleChange}
                            icon="date_input"
                        />
                    </div>
                    <div class="slds-col">
                        <InputField 
                            type="time"
                            value={hora}
                            label="Hora:"
                            name="hora"
                            onChange={handleChange}
                            icon="date_time"
                        />
                    </div>
                </div>
                <div class="slds-grid slds-gutters" id="divport">
                    <div class="slds-size_1-of-2 slds-col">
                        <InputField 
                            id="codport"
                            type="text"
                            value={cod_porteiro}
                            placeholder="Cód. Porteiro"
                            label="Cód. Porteiro:"
                            name="cod_porteiro"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            icon="user"
                            maxLength={4}
                            aria-describedby="error-message-id-49"
                        /> 
                        <div class="slds-form-element__help slds-hidden" id="error-message-id-49">Cód. Porteiro Inválido!</div>
                    </div>      
                    <div class="slds-text-heading_small slds-col slds-m-top_x-large" id="nomePort">{portdt.NOME ? <p>{portdt.NOME}</p> : null}</div>
                </div>
                <h1 class="slds-m-top_small slds-m-bottom_small slds-border_top slds-text-heading_medium slds-align_absolute-center">
                    Informe os mm de Chuva de cada Fazenda
                </h1>
                <div class="slds-grid slds-gutters">
                    <div class="slds-col">
                        <InputField 
                            type="text"
                            value={uslmm}
                            placeholder="USL"
                            label="Usina Santa Lúcia:"
                            name="uslmm"
                            onChange={handleChange}
                            icon="water"
                            maxLength={3}
                        />
                    </div>
                    <div class="slds-col">
                        <InputField 
                            type="text"
                            value={fstmm}
                            placeholder="FST"
                            label="Santa Terezinha:"
                            name="fstmm"
                            onChange={handleChange}
                            icon="water"
                            maxLength={3}
                        />
                    </div>
                </div>
                <div class="slds-grid slds-gutters">
                    <div class="slds-col">
                        <InputField 
                            type="text"
                            value={boamm}
                            placeholder="Boa Vista"
                            label="Boa Vista:"
                            name="boamm"
                            onChange={handleChange}
                            icon="water"
                            maxLength={3}
                        />
                    </div>
                    <div class="slds-col">
                        <InputField 
                            type="text"
                            value={empmm}
                            placeholder="Empyreo"
                            label="Empyreo:"
                            name="empmm"
                            onChange={handleChange}
                            icon="water"
                            maxLength={3}
                        />
                    </div>
                </div>
                <input 
                    //Ano para preencher a tabela
                    className="apaga"
                    onChange={handleChange}
                    name="data_ano" 
                    value={dateFormat(now, "UTC:yyyy")}           
                />
                <input 
                    //Nome do Porteiro para o E-mail
                    className="apaga"
                    onChange={handleChange}
                    name="portnome" 
                    value={portdt.NOME}   
                    ref={portnom}        
                />
                <input 
                    //Data formatada para o E-mail
                    className="apaga"
                    onChange={handleChange}
                    name="data_dia2"  
                    value={dateFormat(data_dia, "UTC:dd/mm/yyyy")} 
                    ref={datadia2}      
                />
                <br />
                <button class="slds-button slds-button_neutral slds-align_absolute-center">Confirmar</button>
            </div>
            ))}
        </form>    
    )
}