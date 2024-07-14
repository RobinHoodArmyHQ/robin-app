import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  formFieldContainer: {
    flexGrow: 1,
  },
  formField: {
    minHeight: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_1,
  },
  formInput: {
    fontSize: 14,
    lineHeight: 24,
    paddingLeft: 8,
    textAlignVertical: 'top',
    paddingTop: 6,
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
