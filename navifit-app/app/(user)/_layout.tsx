import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import BookIcon from '@/assets/icons/book.svg';
import CutleryIcon from '@/assets/icons/cutlery.svg';
import DumbellIcon from '@/assets/icons/dumbell.svg';
import FlagIcon from '@/assets/icons/flag.svg';
import MenuIcon from '@/assets/icons/menu-tab.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#1C2227",
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Diary',
          tabBarIcon: ({ color }) => (
            <BookIcon style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="mealPlan"
        options={{
          title: 'Meal plan',
          tabBarIcon: ({ color }) => (
            <CutleryIcon style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => (
            <DumbellIcon style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color }) => (
            <FlagIcon style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => (
            <MenuIcon style={{ color }} />
          ),
        }}
      />
    </Tabs>
  );
}
