/* eslint-disable max-lines-per-function */
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import type { PickerItemProps, TextFieldRef } from 'react-native-ui-lib';
import {
  Button,
  Colors,
  DateTimePicker,
  Incubator,
  Picker,
  View,
  Wizard,
} from 'react-native-ui-lib';

import type { CreateEventRequest, CreateEventResponse } from '@/api/events';
import { useCreateEvent } from '@/api/events';
import RHA from '@/components';
import { EventDetails } from '@/components/ui/event-details';

const event_type_options: PickerItemProps[] = [
  { value: 'MEAL_DRIVE', label: 'Meal Drive' },
  { value: 'ACADEMY', label: 'Academy' },
];

const updateTime = (date?: Date, time?: Date) => {
  if (date === undefined || time === undefined) {
    return new Date();
  }

  const newDate = new Date(date);
  newDate.setHours(time.getHours());
  newDate.setMinutes(time.getMinutes());

  return newDate;
};

export default function Create() {
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: Incubator.ToastPresets | 'success' | 'failure';
  }>({
    visible: false,
    message: '',
    type: 'failure',
  });

  // update location data in state when received as URL param (e.g. passed by location-picker)
  const { event_location_param } = useLocalSearchParams();
  useEffect(() => {
    if (typeof event_location_param === 'string') {
      const location = JSON.parse(event_location_param);
      if (location === null) {
        console.log(
          'WARN: Ignoring invalid location data received in param: ' +
            event_location_param
        );
        return;
      }

      setState((prevState) => ({
        ...prevState,
        formData: {
          ...prevState.formData,
          event_location: {
            latitude: location.latitude,
            longitude: location.longitude,
            name: location.name,
          },
        },
      }));
    }
  }, [event_location_param]);

  const {
    mutate: createEvent,
    isPending: isEventRequestPending,
    reset: resetCreateEvent,
  } = useCreateEvent();

  let eventTitleInputRef = useRef<TextFieldRef>(null);
  let eventDescriptionInputRef = useRef<TextFieldRef>(null);
  let eventDateInputRef = useRef<TextFieldRef>(null);
  let eventStartTimeInputRef = useRef<TextFieldRef>(null);
  let eventLocationInputRef = useRef<TextFieldRef>(null);

  const initialState: {
    activeIndex: number;
    completedStepIndex: number;
    lastStepIndex: number;
    eventDate?: Date;
    eventStartTime?: Date;
    success: boolean;
    eventID: string;
    formData: CreateEventRequest;
  } = {
    activeIndex: 0,
    completedStepIndex: 0,
    lastStepIndex: 2,
    success: false,
    eventID: '',
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
          eventId="preview"
          title={state.formData.title}
          description={state.formData.description}
          eventStartTime={state.formData.start_time}
          eventLocation={state.formData.event_location}
          preview
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
          ref={eventDateInputRef}
          minimumDate={new Date()}
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
          validate={['required']}
          validationMessage={['Date is required']}
          validateOnChange
          leadingAccessory={
            <RHA.Icons.Calendar fill={Colors.grey_2} width={20} />
          }
          value={state.eventDate}
          onChange={(date: Date) => {
            setState((prevState) => ({
              ...prevState,
              eventDate: date,
              formData: {
                ...prevState.formData,
                start_time: updateTime(date, state.eventStartTime),
              },
            }));
          }}
        />
        <DateTimePicker
          placeholder={'Start Time'}
          ref={eventStartTimeInputRef}
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
          validationMessage={['Time is required']}
          validateOnChange
          enableErrors
          leadingAccessory={<RHA.Icons.Clock fill={Colors.grey_2} width={20} />}
          value={state.eventStartTime}
          onChange={(date: Date) => {
            setState((prevState) => ({
              ...prevState,
              eventStartTime: date,
              formData: {
                ...prevState.formData,
                start_time: updateTime(state.eventDate, date),
              },
            }));
          }}
        />

        <TouchableOpacity onPress={() => router.navigate('/location-picker')}>
          <RHA.Form.Input
            placeholder="Event Location"
            ref={eventLocationInputRef}
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
            validationMessage={['Location is required']}
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

  const onNext = () => {
    const isTitleValid = eventTitleInputRef.current?.validate?.();
    const isDescriptionValid = eventDescriptionInputRef.current?.validate();
    const isDateValid = eventDateInputRef.current?.validate();
    const isStartTimeValid = eventStartTimeInputRef.current?.validate();
    const isLocationValid = eventLocationInputRef.current?.validate();
    if (
      isTitleValid === false ||
      isDescriptionValid === false ||
      isDateValid === false ||
      isStartTimeValid === false ||
      isLocationValid === false
    ) {
      console.log(
        'validation failed: ',
        isTitleValid,
        isDescriptionValid,
        isDateValid,
        isStartTimeValid,
        isLocationValid
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

    if (state.activeIndex === state.lastStepIndex) {
      Alert.alert(
        'Confirmation',
        'Event details cannot be modified after creation.\n\nAre you sure you want to create this Event?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Yes', onPress: onSubmit },
        ]
      );
    }
  };

  const onSubmit = () => {
    resetCreateEvent();

    createEvent(
      { ...state.formData },
      {
        onSuccess: (response: CreateEventResponse) => {
          console.log('response: ', response);
          setState({ ...state, success: true, eventID: response.event_id });
        },
        onError: (err) => {
          setToast({
            visible: true,
            message: 'Error creating event: ' + (err?.message || ''),
            type: 'failure',
          });
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Event',
        }}
      />

      <Incubator.Toast
        visible={toast.visible}
        message={toast.message}
        position={'top'}
        preset={toast.type}
        backgroundColor={Colors.red70}
        autoDismiss={10000}
        action={{
          label: 'Dismiss',
          onPress: () => {
            setToast({ ...toast, visible: false });
          },
        }}
        onDismiss={() => {
          setToast({ ...toast, visible: false });
        }}
      />

      {isEventRequestPending && (
        <RHA.UI.Overlay
          type="loading"
          message={'Creating Event...'}
          messageStyle={{ color: Colors.white }}
          containerStyle={{ backgroundColor: Colors.rgba(Colors.grey_3, 0.9) }}
        />
      )}

      {state.success && (
        <RHA.UI.Overlay
          type="success"
          message="Yayy!! your event has been created, share it with the world!"
          showButton
          buttonLabel="Continue"
          onButtonPress={() => router.replace('/event/' + state.eventID)}
        />
      )}

      <View flex>
        <Wizard
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

        <ScrollView style={{ marginTop: 36, paddingHorizontal: 20 }}>
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
            <RHA.Form.Button
              label={
                state.activeIndex < state.lastStepIndex ? 'Next' : 'Publish'
              }
              iconOnRight
              iconSource={ArrowRightIcon}
              onPress={onNext}
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
