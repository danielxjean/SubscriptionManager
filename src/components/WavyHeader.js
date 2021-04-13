import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WavyHeader({ customStyles }) {
    return (
        <View style={customStyles}>
          <View style={{ backgroundColor: '#516AC2', height: 160 }}>
            <Svg
              height="60%"
              width="100%"
              viewBox="0 0 1440 320"
              style={{ position: 'absolute', top: 130 }}
            >
              <Path
                fill="#516AC2"
                d="M0,288L48,256C96,224,192,160,288,138.7C384,117,480,139,576,165.3C672,192,768,224,864,250.7C960,277,1056,299,1152,272C1248,245,1344,171,1392,133.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </Svg>
          </View>
        </View>
      );
    }