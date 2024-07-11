import FacebookLogo from '@/../assets/icons/facebook_logo.svg';
import GoogleLogo from '@/../assets/icons/google_logo.svg';
import RightArrow from '@/../assets/icons/right-arrow.svg';

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
  },
};

export default RHA;
