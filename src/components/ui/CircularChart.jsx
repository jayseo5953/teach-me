import React from 'react';

const CircularChart = () => {
  const containerStyle = {
    width: '358px',
    height: '244px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const shadowLayerStyle = (
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffsetX,
    shadowOffsetY
  ) => ({
    position: 'absolute',
    width: '358px',
    height: '244px',
    borderRadius: '0px',
    boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowRadius}px rgba(0, 0, 0, ${shadowOpacity})`,
  });

  const shapeLayerStyle = {
    position: 'absolute',
    width: '358px',
    height: '244px',
    backgroundColor: '#ffffff',
    borderRadius: '0px',
    zIndex: 1, // Ensures shape is above shadows
  };

  return (
    <div style={containerStyle}>
      {/* Shadow Layers */}
      <div style={shadowLayerStyle('rgba(0, 0, 0, 0.02)', 1, 4, 0, 2)} />
      <div style={shadowLayerStyle('rgba(0, 0, 0, 0.01)', 1, 16, 1, 8)} />
      <div style={shadowLayerStyle('rgba(0, 0, 0, 0.01)', 1, 32, 0, 16)} />
      <div style={shadowLayerStyle('rgba(0, 0, 0, 0.02)', 1, 64, 0, 32)} />

      {/* Shape Layer */}
      <div style={shapeLayerStyle} />
    </div>
  );
};

export default CircularChart;
