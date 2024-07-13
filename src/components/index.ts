import Calendar from '@/../assets/icons/calendar.svg';
import DownArrow from '@/../assets/icons/down-arrow.svg';
import EventName from '@/../assets/icons/event-name.svg';
import EventType from '@/../assets/icons/event-type.svg';
import FacebookLogo from '@/../assets/icons/facebook_logo.svg';
import GoogleLogo from '@/../assets/icons/google_logo.svg';
import LocationPin from '@/../assets/icons/location-pin.svg';
import RightArrow from '@/../assets/icons/right-arrow.svg';
import TabsHome from '@/../assets/icons/tabs-home.svg';
import TabsLeaderboard from '@/../assets/icons/tabs-leaderboard.svg';
import TabsProfile from '@/../assets/icons/tabs-profile.svg';
import Clock from '@/../assets/icons/time.svg';

import { Button } from './form/button';
import { EmailInput } from './form/email-input';
import { Input } from './form/input';
import { NameInput } from './form/name-input';
import { PasswordInput } from './form/password-input';
import { PrimaryButton } from './form/primary-button';
import H1 from './typography/h1';

const RHA = {
  Type: {
    H1,
  },
  Form: {
    EmailInput,
    PasswordInput,
    NameInput,
    Input,
    Button,
    PrimaryButton,
  },
  Icons: {
    FacebookLogo,
    GoogleLogo,
    RightArrow,
    DownArrow,
    LocationPin,
    Calendar,
    TabsHome,
    TabsLeaderboard,
    TabsProfile,
    EventName,
    EventType,
    Clock,
  },
};

export default RHA;
