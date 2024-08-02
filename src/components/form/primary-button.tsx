import React from 'react';
import type { ButtonProps } from 'react-native-ui-lib';

import { Icons } from '../icons';
import { Button } from './button';

export const PrimaryButton = (props: ButtonProps) => {
  return <Button {...props} iconOnRight iconSource={RightArrow} />;
};

function RightArrow() {
  return <Icons.ArrowRight />;
}
