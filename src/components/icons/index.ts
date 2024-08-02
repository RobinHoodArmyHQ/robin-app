import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import ArrowDown from '@/../assets/icons/arrow-down.svg';
import ArrowLeft from '@/../assets/icons/arrow-left.svg';
import ArrowRight from '@/../assets/icons/arrow-right.svg';
import Calendar from '@/../assets/icons/calendar.svg';
import CheckIn from '@/../assets/icons/checkin.svg';
import EventName from '@/../assets/icons/event-name.svg';
import EventType from '@/../assets/icons/event-type.svg';
import FacebookLogo from '@/../assets/icons/facebook_logo.svg';
import GoogleLogo from '@/../assets/icons/google_logo.svg';
import LocationPin from '@/../assets/icons/location-pin.svg';
import Plus from '@/../assets/icons/plus.svg';
import Share from '@/../assets/icons/share.svg';
import TabsHome from '@/../assets/icons/tabs-home.svg';
import TabsLeaderboard from '@/../assets/icons/tabs-leaderboard.svg';
import TabsProfile from '@/../assets/icons/tabs-profile.svg';
import Clock from '@/../assets/icons/time.svg';

const render = (
  Icon: FC<SvgProps>,
  props: {
    fill?: string;
    stroke?: string;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
  } = {}
) => {
  return () => Icon(props) as unknown as JSX.Element;
};

export const Icons = {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  EventName,
  EventType,
  FacebookLogo,
  GoogleLogo,
  LocationPin,
  Share,
  TabsHome,
  TabsLeaderboard,
  TabsProfile,
  Plus,
  CheckIn,
  render,
};
