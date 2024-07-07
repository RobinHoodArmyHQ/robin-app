import { Env } from '@env';
import { Link } from 'expo-router';
import React from 'react';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { translate, useAuth } from '@/core';
import { ScrollView, Text, View } from '@/ui';

export default function Settings() {
  const signOut = useAuth.use.signOut();

  return (
    <>
      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>

          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.development">
            <Link href="/auth/login">
              <Item text="settings.login" />
            </Link>
            <Link href="/onboarding">
              <Item text="settings.onboarding" />
            </Link>
            <Link href="/event/create">
              <Item text="settings.create_event" />
            </Link>
            <Link href="/event/6a0cf46b-3e88-4a2d-8889-4833cde544ee">
              <Item text="settings.event_details" />
            </Link>
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
