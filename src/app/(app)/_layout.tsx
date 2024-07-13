/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Colors, Text } from 'react-native-ui-lib';

import RHA from '@/components';
import { useAuth, useIsFirstTime } from '@/core';
import { Settings as SettingsIcon } from '@/ui/icons';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

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
