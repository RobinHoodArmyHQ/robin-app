/* eslint-disable max-lines-per-function */
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import type { TextFieldRef } from 'react-native-ui-lib';
import {
  Button,
  Colors,
  DateTimePicker,
  Picker,
  Text,
  View,
  Wizard,
} from 'react-native-ui-lib';

import RHA from '@/components';
import type { Option } from '@/ui';
import { ArrowRight } from '@/ui/icons';

export default function Create() {
  // const { mutate: createEvent, isPending } = useCreateEvent();
  const { event_location } = useLocalSearchParams();
  const event_type_options: Option[] = [
    { value: 'MEAL_DRIVE', label: 'Meal Drive' },
    { value: 'ACADEMY', label: 'Academy' },
  ];

  let eventTitleInputRef = React.createRef<TextFieldRef>();

  const initialState = {
    activeIndex: 0,
    completedStepIndex: 0,
    lastStepIndex: 2,
    formData: {
      title: '',
      description: '',
      event_type: event_type_options[0].value.toString(),
      event_location: {
        latitude: 0,
        longitude: 0,
      },
    },
  };
  const [state, setState] = useState(initialState);

  const onActiveIndexChanged = (activeIndex: number) => {
    setState({ ...state, activeIndex });
  };

  const getStepState = (index: number) => {
    const { activeIndex, completedStepIndex } = state;

    let currentState = Wizard.States.DISABLED;
    if (completedStepIndex && completedStepIndex > index - 1) {
      currentState = Wizard.States.COMPLETED;
    } else if (activeIndex === index) {
      currentState = Wizard.States.ENABLED;
    }

    return currentState;
  };

  const renderCurrentStep = () => {
    switch (state.activeIndex) {
      case 0:
      default:
        return renderBasicDetailsForm();
      case 1:
        return renderMoreDetailsForm();
      case 2:
        return <Text>TODO</Text>;
    }
  };

  const renderBasicDetailsForm = () => {
    return (
      <>
        <Picker
          marginB-16
          value={state.formData.event_type}
          placeholder={'Event Type'}
          placeholderTextColor={Colors.grey_1}
          onChange={(option) => {
            if (typeof option === 'string') {
              setState({
                ...state,
                formData: { ...state.formData, event_type: option.toString() },
              });
            }
          }}
          items={event_type_options}
          useDialog
          style={{ fontSize: 14, paddingLeft: 8 }}
          trailingAccessory={<RHA.Icons.DownArrow fill={Colors.grey_2} />}
          leadingAccessory={
            <RHA.Icons.EventType fill={Colors.grey_2} height={18} />
          }
          floatingPlaceholder
          floatingPlaceholderStyle={{
            paddingLeft: 6,
            fontSize: 14,
            lineHeight: 32,
          }}
          fieldStyle={{
            borderBottomColor: Colors.grey_1,
            borderBottomWidth: 1,
            height: 32,
          }}
          validate={['required']}
          validateOnBlur
          validateOnStart
          validationMessage={'Event Type is required'}
          validationMessageStyle={{
            paddingTop: 4,
            backgroundColor: Colors.red50,
          }}
        />

        <RHA.Form.Input
          placeholder="Event Title"
          value={state.formData.title}
          ref={eventTitleInputRef}
          leadingAccessory={
            <RHA.Icons.EventName fill={Colors.grey_2} height={16} />
          }
          validate={['required']}
          validationMessage={['Event Title is required']}
          onChangeText={(text) => {
            setState({
              ...state,
              formData: { ...state.formData, title: text },
            });
          }}
        />

        <RHA.Form.Input
          placeholder="Event Details"
          leadingAccessory={
            <RHA.Icons.EventName
              fill={Colors.grey_2}
              height={18}
              style={{ alignSelf: 'flex-start', marginTop: 6 }}
            />
          }
          multiline
          numberOfLines={8}
        />

        {/* <Input
          label="Title"
          onChangeText={(text) =>
            setState({ ...state, formData: { ...state.formData, title: text } })
          }
        />

        <Input
          label="Description"
          multiline
          onChangeText={(text) =>
            setState({
              ...state,
              formData: { ...state.formData, description: text },
            })
          }
        />

        
        <Button
          className="mt-10"
          label="Create Event"
          loading={isPending}
          onPress={onSubmit}
        /> */}
      </>
    );
  };

  const renderMoreDetailsForm = () => {
    return (
      <>
        <DateTimePicker
          placeholder={'Date of Event'}
          minimumDate={new Date(2024, 0, 1)}
          floatingPlaceholder
          floatingPlaceholderStyle={{
            paddingLeft: 8,
            fontSize: 14,
            lineHeight: 32,
          }}
          containerStyle={{ alignSelf: 'stretch', flexGrow: 1 }}
          fieldStyle={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.grey_1,
            minHeight: 32,
          }}
          style={{
            fontSize: 14,
            lineHeight: 24,
            paddingLeft: 8,
            textAlignVertical: 'top',
            paddingTop: 6,
          }}
          mode={'date'}
          enableErrors
          leadingAccessory={
            <RHA.Icons.Calendar fill={Colors.grey_2} width={20} />
          }
        />
        <DateTimePicker
          placeholder={'Start Time'}
          is24Hour={false}
          dateTimeFormatter={(date) =>
            date
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              .toLocaleUpperCase()
          }
          floatingPlaceholder
          floatingPlaceholderStyle={{
            paddingLeft: 8,
            fontSize: 14,
            lineHeight: 32,
          }}
          containerStyle={{ alignSelf: 'stretch', flexGrow: 1 }}
          fieldStyle={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.grey_1,
            minHeight: 32,
          }}
          style={{
            fontSize: 14,
            lineHeight: 24,
            paddingLeft: 8,
            textAlignVertical: 'top',
            paddingTop: 6,
          }}
          mode={'time'}
          validate={['required']}
          validationMessage={''}
          validateOnChange
          enableErrors
          leadingAccessory={<RHA.Icons.Clock fill={Colors.grey_2} width={20} />}
        />

        <TouchableOpacity onPress={() => router.navigate('/location-picker')}>
          <RHA.Form.Input
            placeholder="Event Location"
            value={
              state.formData.event_location.latitude !== 0 ||
              state.formData.event_location.longitude !== 0
                ? `${state.formData.event_location.latitude}, ${state.formData.event_location.longitude}`
                : ''
            }
            leadingAccessory={
              <RHA.Icons.LocationPin fill={Colors.grey_2} width={20} />
            }
            validate={['required']}
            validationMessage={''}
            validateOnChange
            editable={false}
            multiline={true}
          />
        </TouchableOpacity>
      </>
    );
  };

  // const initialData: CreateEventRequest = {
  //   title: '',
  //   description: '',
  //   event_type: event_type_options[0].value.toString(),
  //   event_location: null,
  // };
  // const [formData, setFormData] = useState(initialData);

  // update location field in formData whenever location changes
  useEffect(() => {
    if (event_location) {
      const [latitude, longitude] = event_location
        .toString()
        .split(',')
        .map(Number);
      if (latitude && longitude) {
        setState((prevState) => ({
          ...prevState,
          formData: {
            ...prevState.formData,
            event_location: {
              latitude,
              longitude,
            },
          },
        }));
      }
    }
  }, [event_location]);

  // const onSubmit = () => {
  //   // console.log(formData);
  //   createEvent(
  //     { ...state.formData },
  //     {
  //       onSuccess: (response: any) => {
  //         showMessage({
  //           message: response.status.message,
  //           type: 'success',
  //         });
  //         // here you can navigate to the post list and refresh the list data
  //         //queryClient.invalidateQueries(usePosts.getKey());
  //       },
  //       onError: () => {
  //         showErrorMessage('Error creating event');
  //       },
  //     }
  //   );
  // };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Event',
        }}
      />

      <View className="flex-1  ">
        <Wizard
          testID={'uilib.wizard'}
          activeIndex={state.activeIndex}
          onActiveIndexChanged={onActiveIndexChanged}
          containerStyle={{
            borderBottomColor: Colors.grey_1,
            borderWidth: 0,
            elevation: 0,
            height: 60,
          }}
          activeConfig={{
            state: 'enabled',
            circleColor: Colors.rhaGreen,
            labelStyle: { color: Colors.rhaGreen },
            indexLabelStyle: { color: Colors.rhaGreen },
          }}
        >
          <Wizard.Step state={getStepState(0)} label={'Basic Details'} />
          <Wizard.Step state={getStepState(1)} label={'Timing & Location'} />
          <Wizard.Step state={getStepState(2)} label={'Preview'} />
        </Wizard>

        <ScrollView style={{ marginTop: 36, paddingHorizontal: 24 }}>
          {renderCurrentStep()}
        </ScrollView>

        <View row style={{}}>
          <Button
            margin-24
            label="Previous"
            iconOnRight
            iconSource={ArrowRightIcon}
            iconStyle={{}}
            labelStyle={{
              marginRight: 16,
              fontFamily: 'poppinsSemiBold',
              fontWeight: 'bold',
            }}
            backgroundColor={Colors.grey_2}
            // size={Button.sizes.large}
            borderRadius={8}
            marginT-24
            style={{ height: 56, alignSelf: 'stretch', flexGrow: 1 }}
            onPress={() => {
              setState({
                ...state,
                activeIndex: state.activeIndex > 0 ? state.activeIndex - 1 : 0,
                completedStepIndex:
                  state.completedStepIndex > 0
                    ? state.completedStepIndex - 1
                    : 0,
              });
            }}
          />

          <Button
            margin-24
            label="Next"
            iconOnRight
            iconSource={ArrowRightIcon}
            iconStyle={{}}
            labelStyle={{
              marginRight: 16,
              fontFamily: 'poppinsSemiBold',
              fontWeight: 'bold',
            }}
            backgroundColor={Colors.rhaGreen}
            // size={Button.sizes.large}
            borderRadius={8}
            style={{ height: 56, alignSelf: 'stretch', flexGrow: 1 }}
            onPress={() => {
              const isValid = eventTitleInputRef.current?.validate?.();
              console.log(isValid);

              setState({
                ...state,
                activeIndex:
                  state.activeIndex < state.lastStepIndex
                    ? state.activeIndex + 1
                    : state.lastStepIndex,
                completedStepIndex:
                  state.completedStepIndex < state.lastStepIndex
                    ? state.completedStepIndex + 1
                    : state.lastStepIndex,
              });
            }}
          />

          {/* <RHA.Form.PrimaryButton label="Next" /> */}
        </View>
      </View>
    </>
  );
}

function ArrowRightIcon() {
  return <ArrowRight width={8} translateY={1} />;
}
