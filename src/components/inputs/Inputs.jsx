import React  from "react";
import { Icon } from '../icons/Icon';

const InputField = ({ id, value, label, name, placeholder, type, onChange, onBlur, onFocus, icon, maxLength, style, ariaDesc, ariaInv, disabled }) => (
    <div class="slds-form-element">
        {label && <label class="slds-form-element__label" for="text-input-id-46">{label}</label>}
        <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
            <div class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" aria-hidden="true">
                < Icon type="utility" name={icon}  size="x-small" />
            </div>
            <input 
                id={id} 
                class="slds-input" 
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                maxLength={maxLength}
                required
                style={style}
                aria-describedby={ariaDesc}
                aria-invalid={ariaInv}
                disabled={disabled}
            />
        </div>
    </div>
);

export default InputField;