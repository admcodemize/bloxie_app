import * as React from "react";
import { View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withSpring } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.8
 * @version 0.0.1
 * @type */
export type ChartDonutProgressProps = {
  /** @description Size of the donut chart in pixels */
  size?: number;
  /** @description Stroke width (thickness of the ring) */
  strokeWidth?: number;
  /** @description Progress value between 0 and 1 (0% to 100%) */
  progress: number;
  /** @description Color for the filled portion */
  color?: string;
  /** @description Background color for unfilled portion */
  backgroundColor?: string;
  /** @description Whether to animate the progress */
  animated?: boolean;
  /** @description Children to render in the center */
  children?: React.ReactNode;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Animated donut chart component for displaying progress
 * Perfect for showing booking slot availability on calendar days
 * @since 0.0.8
 * @version 0.0.1
 * @param {ChartDonutProgressProps} props
 * @component */
const ChartDonutProgress = ({
  size = 26,
  strokeWidth = 2,
  progress,
  color = "#303030",
  backgroundColor = "#E0E0E0",
  animated = true,
  children
}: ChartDonutProgressProps) => {
  /** @description Clamp progress between 0 and 1 */
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  const progressValue = useSharedValue(clampedProgress);

  /** @description Calculate circle properties */
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

  /** @description Animate progress on mount and when it changes */
  React.useEffect(() => {
    if (animated) {
      progressValue.value = withSpring(clampedProgress, {
        damping: 15,
        stiffness: 100,
      });
    } else {
      progressValue.value = clampedProgress;
    }
  }, [clampedProgress, animated]);

  /** @description Animated props for the progress circle */
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (progressValue.value * circumference);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center", backgroundColor, borderRadius: 13 }}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      
      {/* Center content */}
      {children && (
        <View style={{ 
          position: "absolute", 
          justifyContent: "center", 
          alignItems: "center",
        }}>
          {children}
        </View>
      )}
    </View>
  );
};

export default ChartDonutProgress;

