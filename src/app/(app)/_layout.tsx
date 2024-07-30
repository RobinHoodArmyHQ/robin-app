/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, Text } from 'react-native-ui-lib';

import type { City } from '@/api/location/cities';
import { useCities } from '@/api/location/cities';
// import { useCities } from '@/api/location/cities';
import RHA from '@/components';
import { useAuth, useIsFirstTime } from '@/core';
import { getItem, setItem } from '@/core/storage';
import { Settings as SettingsIcon } from '@/ui/icons';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [citiesLoaded, setCitiesLoaded] = useState(false);

  const storedCities = getItem<City[]>('global.cities');

  const {
    data: getCitiesResponse,
    isLoading: isLoadingGetCities,
    error: errorGetCities,
    //    refetch,
  } = useCities();

  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (storedCities && storedCities.length > 0) {
      // hide splash if cities already present in storage
      setCitiesLoaded(true);
      hideSplash();
    } else if (!isLoadingGetCities || errorGetCities) {
      // else fetch cities and hide when loaded or error occurs
      hideSplash();
    }

    if (errorGetCities === null && getCitiesResponse?.status?.success) {
      setItem('global.cities', getCitiesResponse.cities);
      setCitiesLoaded(true);
      console.log('cities loaded');
    }
    // if (status !== 'idle') {
    //   setTimeout(() => {
    //     hideSplash();
    //   }, 1000);
    // }
  }, [
    hideSplash,
    isLoadingGetCities,
    errorGetCities,
    storedCities,
    getCitiesResponse,
  ]);

  if (!citiesLoaded && errorGetCities) {
    console.log('errorGetCities', errorGetCities);
    console.log('isLoadingGetCities', isLoadingGetCities);
    return <Text>Could not load cities</Text>;
  }

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <RHA.Icons.TabsHome fill={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'home-tab',
          headerStyle: { backgroundColor: Colors.rhaGreen },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <RHA.Icons.TabsLeaderboard fill={color} stroke={color} />
          ),
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'leaderboard-tab',
          headerStyle: { backgroundColor: Colors.rhaGreen },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <RHA.Icons.TabsProfile fill={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'profile-tab',
          headerStyle: { backgroundColor: Colors.rhaGreen },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/event/create" asChild>
      <Text style={{ color: Colors.white, paddingRight: 20 }}>Create</Text>
    </Link>
  );
};
