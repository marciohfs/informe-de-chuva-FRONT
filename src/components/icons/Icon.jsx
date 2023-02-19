import UTILITY_ICONS from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import ACTION_ITONS from '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg';
import CUSTOM_ICONS from '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
import DOCTYPE_ICONS from '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg';
import STANDARD_ICONS from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
import { useEffect, useState } from 'react';

const iconsPath = {
  utility: UTILITY_ICONS,
  action: ACTION_ITONS,
  custom: CUSTOM_ICONS,
  doctype: DOCTYPE_ICONS,
  standard: STANDARD_ICONS,
};

const iconsDefaultColor = {
  currentColor: 'slds-current-color',
  warning: 'slds-icon-text-warning',
  success: 'slds-icon-text-success',
  error: 'slds-icon-text-error',
  light: 'slds-icon-text-light',
};

const iconSize = {
  'xx-small': 'slds-icon_xx-small',
  'x-small': 'slds-icon_x-small',
  small: 'slds-icon_small',
  large: 'slds-icon_large',
};

export function Icon(props) {
  const [iconContainerClass, setIconContainerClass] = useState(['slds-icon_container']);
  const [iconSvgClass, setIconSvgClass] = useState(['slds-icon']);
  const [iconPath, setIconPath] = useState('');
  const [iconDescription, setIconDescription] = useState('');
  const [iconDefaultColor, setIconDefaultColor] = useState('');
  const [iconStyleColor, setIconStyleColor] = useState({});
  const [iconBackgroundColor, setIconBackgroundColor] = useState({});

  function setColor() {
    if (props.defaultColor !== null && props.defaultColor !== undefined && props.defaultColor !== '') {
      const defaultColor = iconsDefaultColor[props.defaultColor];
      setIconDefaultColor(defaultColor);
    } else if (props.color !== null && props.color !== undefined && props.color !== '') {
      const styleIcon = {
        fill: props.color,
      };

      setIconStyleColor(styleIcon);
    }

    if (props.backgroundColor !== null && props.backgroundColor !== undefined && props.backgroundColor !== '') {
      const backgroundStyle = {
        background: props.backgroundColor,
      };

      setIconBackgroundColor(backgroundStyle);
    }
  }

  function setIconSize() {
    if (props.size) {
      const classSize = iconSize[props.size];
      setIconSvgClass([classSize, ...iconSvgClass]);
    }
  }

  useEffect(() => {
    setIconPath(iconsPath[props.type]);
    setIconDescription(props.description || props.name);
    setColor();
    setIconSize();

    if (props.circle) {
      setIconContainerClass(['slds-icon_container_circle', ...iconContainerClass]);
    }
  }, []);

  return (
    <>
      <span
        className={`${iconContainerClass.join(' ')} ${iconDefaultColor}`}
        title={iconDescription}
        style={iconBackgroundColor}
      >
        <svg className={`${iconSvgClass.join(' ')}`} aria-hidden="true" style={iconStyleColor}>
          <use xlinkHref={`${iconPath}#${props.name}`}></use>
        </svg>
        <span className="slds-assistive-text">{iconDescription}</span>
      </span>
    </>
  );
}
