import React from 'react'

interface ResponsiveHeaderProps {
  label: string
  iconClass?: string
  screenWidth: number
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ label, iconClass, screenWidth }) => {
  const iconHeader = <i className={`fa-solid ${iconClass} text-base`}></i>

  const header = iconClass === undefined ?
    label :
    (screenWidth > 510 ? label : iconHeader)

  return (
    <>
      {header}
      {/* {screenWidth > 510 ? label : <i className={`fa-solid ${iconClass} text-base${hoverable ? ' group-hover:brightness-80 duration-200' : ''}`}></i>} */}
    </>
  );
};

export default ResponsiveHeader
