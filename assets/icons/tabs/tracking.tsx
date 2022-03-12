import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Tracking = ({color, ...props}: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      opacity={0.4}
      d="M17.54 2.167H8.471c-3.954 0-6.305 2.35-6.305 6.294v9.067c0 3.944 2.35 6.294 6.294 6.294h9.067c3.944 0 6.295-2.35 6.295-6.294V8.461c.01-3.944-2.34-6.295-6.284-6.295Z"
      fill={color ? color : '#0D6EFD'}
    />
    <Path
      d="m18.796 9.804-2.535 8.168c-.607 1.94-3.326 1.972-3.965.044l-.758-2.243a2.053 2.053 0 0 0-1.311-1.31l-2.254-.759c-1.917-.639-1.885-3.38.054-3.965l8.169-2.546c1.603-.487 3.109 1.019 2.6 2.611Z"
      fill={color ? color : '#0D6EFD'}
    />
  </Svg>
);

export default Tracking;
