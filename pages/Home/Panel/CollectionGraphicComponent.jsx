import { View } from "react-native";
import React from "react";
import Svg, { Circle, Text, G, Path } from "react-native-svg";

export default function CollectionGraphicComponent({
  size,
  strokeWidth,
  color1,
  color2,
  text,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfCircumference = circumference / 2;

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={color1}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${halfCircumference} ${halfCircumference}`}
          strokeDashoffset={circumference / 4}
        />
        <Circle
          stroke={color2}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${halfCircumference} ${halfCircumference}`}
          strokeDashoffset={-circumference / 4}
        />
        <Circle
          stroke="#ffffff"
          fill="#ffffff"
          cx={size / 3}
          cy={size / 2}
          r={radius - strokeWidth / 2}
        />
        <G
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          alignmentBaseline="central"
        >
          <Text
            fill="black"
            fontSize="18"
            fontWeight="bold"
            textAnchor="start"
            dy=".3em"
          >
            {text}
          </Text>
          <G x={-60} y={-10}>
            <Path d="M 0 -10 L -10 -20 L 10 -20 Z" fill="black" />
          </G>
          <G x={-20} y={-16}>
            <Path d="M 0 10 L -10 20 L 10 20 Z" fill="black" />
          </G>
        </G>
      </Svg>
    </View>
  );
}
