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
  View,
  Wizard,
} from 'react-native-ui-lib';

import RHA from '@/components';
import { EventDetails } from '@/components/event-details';
import type { Option } from '@/ui';

export default function Create() {
  // const { mutate: createEvent, isPending } = useCreateEvent();

  const { event_location_param } = useLocalSearchParams();
  useEffect(() => {
    if (typeof event_location_param === 'string') {
      const location = JSON.parse(event_location_param);
      if (location === null) {
        return;
      }

      const { latitude, longitude, name } = location;
      // const [latitude, longitude] = event_location_param
      //   .toString()
      //   .split(',')
      //   .map(Number);

      if (latitude && longitude) {
        setState((prevState) => ({
          ...prevState,
          formData: {
            ...prevState.formData,
            event_location: {
              latitude: latitude,
              longitude: longitude,
              name: name,
            },
          },
        }));
      }
    }
  }, [event_location_param]);

  const event_type_options: Option[] = [
    { value: 'MEAL_DRIVE', label: 'Meal Drive' },
    { value: 'ACADEMY', label: 'Academy' },
  ];

  let eventTitleInputRef = React.createRef<TextFieldRef>();
  let eventDescriptionInputRef = React.createRef<TextFieldRef>();

  const initialState: {
    activeIndex: number;
    completedStepIndex: number;
    lastStepIndex: number;
    formData: {
      title: string;
      description: string;
      event_type: string;
      event_location: {
        latitude: number;
        longitude: number;
        name?: string;
      };
      eventDate?: Date;
      eventStartTime?: Date;
    };
  } = {
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
        return renderPreview();
    }
  };

  const renderPreview = () => {
    return (
      <>
        <EventDetails
          title={state.formData.title}
          description={state.formData.description}
          eventDate={state.formData.eventDate}
          eventStartTime={state.formData.eventStartTime}
          eventLocation={state.formData.event_location}
        />
      </>
    );
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
          trailingAccessory={<RHA.Icons.ArrowDown stroke={Colors.grey_2} />}
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
          placeholder="Event Description"
          ref={eventDescriptionInputRef}
          leadingAccessory={
            <RHA.Icons.EventName
              fill={Colors.grey_2}
              height={18}
              style={{ alignSelf: 'flex-start', marginTop: 6 }}
            />
          }
          multiline
          numberOfLines={8}
          autoCapitalize="sentences"
          value={state.formData.description}
          validate={['required', (text: string) => text.length > 100]}
          validationMessage={[
            'Event Description is required',
            'Description is too short',
          ]}
          onChangeText={(text) => {
            setState({
              ...state,
              formData: { ...state.formData, description: text },
            });
          }}
        />
      </>
    );
  };

  const renderMoreDetailsForm = () => {
    let eventLocationInputValue = state.formData.event_location.name;
    if (
      !eventLocationInputValue &&
      (state.formData.event_location.latitude !== 0 ||
        state.formData.event_location.longitude !== 0)
    ) {
      eventLocationInputValue = `${state.formData.event_location.latitude}, ${state.formData.event_location.longitude}`;
    }

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
          value={state.formData.eventDate}
          onChange={(date: Date) => {
            setState((prevState) => ({
              ...prevState,
              formData: { ...prevState.formData, eventDate: date },
            }));
          }}
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
          value={state.formData.eventStartTime}
          onChange={(date: Date) => {
            setState((prevState) => ({
              ...prevState,
              formData: { ...prevState.formData, eventStartTime: date },
            }));
          }}
        />

        <TouchableOpacity onPress={() => router.navigate('/location-picker')}>
          <RHA.Form.Input
            placeholder="Event Location"
            value={
              state.formData.event_location.name
                ? state.formData.event_location.name
                : state.formData.event_location.latitude !== 0 ||
                  state.formData.event_location.longitude !== 0
                ? `${state.formData.event_location.latitude.toPrecision(
                    8
                  )}, ${state.formData.event_location.longitude.toPrecision(8)}`
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
            showClearButton
            onClear={() => {
              setState((prevState) => ({
                ...prevState,
                formData: {
                  ...prevState.formData,
                  event_location: { latitude: 0, longitude: 0 },
                },
              }));
            }}
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
            state: 'disabled',
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

        <View
          row
          style={{
            justifyContent: 'space-between',
            margin: 20,
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button
              label="Previous"
              iconSource={ArrowLeftIcon}
              labelStyle={{
                marginHorizontal: 16,
                fontFamily: 'Poppins_600SemiBold',
              }}
              backgroundColor={Colors.grey_2}
              borderRadius={8}
              style={{ height: 56 }}
              disabled={state.activeIndex === 0}
              onPress={() => {
                setState({
                  ...state,
                  activeIndex:
                    state.activeIndex > 0 ? state.activeIndex - 1 : 0,
                  completedStepIndex:
                    state.completedStepIndex > 0
                      ? state.completedStepIndex - 1
                      : 0,
                });
              }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Button
              label="Next"
              iconOnRight
              iconSource={ArrowRightIcon}
              labelStyle={{
                marginHorizontal: 16,
                fontFamily: 'Poppins_600SemiBold',
              }}
              backgroundColor={Colors.rhaGreen}
              borderRadius={8}
              style={{ height: 56 }}
              onPress={() => {
                const isTitleValid = eventTitleInputRef.current?.validate?.();
                const isDescriptionValid =
                  eventDescriptionInputRef.current?.validate();
                if (isTitleValid === false || isDescriptionValid === false) {
                  console.log(
                    'title or description is invalid: ',
                    isTitleValid,
                    isDescriptionValid
                  );
                  return;
                }
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
          </View>
        </View>
      </View>
    </>
  );
}

function ArrowRightIcon() {
  return <RHA.Icons.ArrowRight height={14} stroke={Colors.white} />;
}

function ArrowLeftIcon() {
  return <RHA.Icons.ArrowLeft height={14} stroke={Colors.white} />;
}
