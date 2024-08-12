import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }]
  };
}

renderThirdLayer = (percent) => {
  if (percent > 50) {
    return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}></View>
  } else {
    return <View style={styles.offsetLayer}></View>
  }
}

const CircularProgress = ({ value: percent }) => {
  
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      <Text style={styles.display}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    width: 200,
    height: 200,
    borderWidth: 10,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3300FF',
    borderTopColor: '#3300FF',
    transform: [{ rotateZ: '-135deg' }]
  },
  secondProgressLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3300FF',
    borderTopColor: '#3300FF',
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#E0E0E0',
    borderTopColor: '#E0E0E0',
    transform: [{ rotateZ: '-135deg' }],
  },
  display: {
    position: 'absolute',
    fontSize: 50,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: 600
  }
});

export default CircularProgress;