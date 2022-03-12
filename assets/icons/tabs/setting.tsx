import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Setting = ({color, ...props}: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      opacity={0.4}
      d="m20.518 5.872-5.6-3.24c-1.073-.617-2.752-.617-3.825 0L5.438 5.894c-2.242 1.517-2.372 1.745-2.372 4.16v5.883c0 2.416.13 2.654 2.416 4.192l5.6 3.24c.542.314 1.236.465 1.918.465.682 0 1.376-.151 1.907-.465l5.655-3.261c2.242-1.517 2.372-1.744 2.372-4.16v-5.894c0-2.415-.13-2.643-2.416-4.181Z"
      fill={color ? color : '#0D6EFD'}
    />
    <Path
      d="M13 16.52a3.521 3.521 0 1 0 0-7.041 3.521 3.521 0 0 0 0 7.042Z"
      fill={color ? color : '#0D6EFD'}
    />
  </Svg>
);

export default Setting;
