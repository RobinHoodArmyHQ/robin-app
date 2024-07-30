import { Button } from './form/button';
import { EmailInput } from './form/email-input';
import { Input } from './form/input';
import { NameInput } from './form/name-input';
import { PasswordInput } from './form/password-input';
import { PrimaryButton } from './form/primary-button';
import { Icons } from './icons';
import H1 from './typography/h1';
import { Overlay } from './ui/overlay';

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
  Icons: Icons,
  UI: {
    Overlay: Overlay,
  },
};

export default RHA;
