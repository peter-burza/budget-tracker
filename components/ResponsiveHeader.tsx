import React from 'react';

interface ResponsiveHeaderProps {
  label: string;
  iconClass: string;
  screenWidth: number;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ label, iconClass, screenWidth }) => {
  return (
    <>
      {screenWidth > 510 ? label : <i className={`fa-solid ${iconClass} text-base`}></i>}
    </>
  );
};

export default ResponsiveHeader;
