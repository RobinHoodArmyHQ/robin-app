/* eslint-disable max-lines-per-function */
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import type { CreateEventRequest } from '@/api/events';
import { useCreateEvent } from '@/api/events/use-create-event';
import type { Option } from '@/ui';
import { Button, Input, Select, showErrorMessage, Text, View } from '@/ui';

export default function Create() {
  const { mutate: createEvent, isPending } = useCreateEvent();
  const { event_location } = useLocalSearchParams();
  const event_type_options: Option[] = [
    { value: 'MEAL_DRIVE', label: 'Meal Drive' },
    { value: 'ACADEMY', label: 'Academy' },
  ];

  const initialData: CreateEventRequest = {
    title: '',
    description: '',
    event_type: event_type_options[0].value.toString(),
    event_location: null,
  };
  const [formData, setFormData] = useState(initialData);

  const [date, setDate] = useState(new Date(1598051730000));
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      minimumDate: new Date(2024, 0, 1),
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // update location field in formData whenever location changes
  useEffect(() => {
    if (event_location) {
      const [latitude, longitude] = event_location
        .toString()
        .split(',')
        .map(Number);
      if (latitude && longitude) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          event_location: {
            latitude,
            longitude,
          },
        }));
      }
    }
  }, [event_location]);

  const onSubmit = () => {
    console.log(formData);
    createEvent(
      { ...formData },
      {
        onSuccess: (response: any) => {
          showMessage({
            message: response.status.message,
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error creating event');
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

      <View className="flex-1 p-4 ">
        <Input
          label="Title"
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />
        <Input
          label="Description"
          multiline
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />
        <Select
          label="Select"
          error=""
          options={event_type_options}
          value={formData.event_type}
          onSelect={(option) =>
            setFormData({ ...formData, event_type: option.toString() })
          }
        />
        <Button onPress={showDatepicker} label="Show date picker!" />
        <Button onPress={showTimepicker} label="Show time picker!" />
        <Text>selected: {date.toLocaleString()}</Text>

        <Button
          className="mt-5"
          label="Select Location"
          onPress={() => router.navigate('/location-picker')}
        />
        <Text>
          Location:{' '}
          {formData.event_location !== null
            ? `${formData.event_location.latitude}, ${formData.event_location.longitude}`
            : 'Not selected'}
        </Text>

        <Button
          className="mt-10"
          label="Create Event"
          loading={isPending}
          onPress={onSubmit}
        />
      </View>
    </>
  );
}
