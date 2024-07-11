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
    minHeight: 32,
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
