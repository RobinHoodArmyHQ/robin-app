import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  formFieldContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  formField: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_1,
    height: 32,
  },
  formInput: {
    fontSize: 14,
    paddingLeft: 8,
  },
  formPlaceholder: {
    paddingLeft: 8,
    fontSize: 14,
    lineHeight: 32,
  },
  formFieldValidationMessage: {
    paddingTop: 4,
  },
});
