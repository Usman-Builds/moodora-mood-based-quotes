import React from 'react';
import { FlatList, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';
import { moods } from '../data/moods';
import type { Mood } from '../types/mood';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MoodSelection'>;

export function MoodSelectionScreen() {
  const navigation = useNavigation<Nav>();

  const renderItem = ({ item }: { item: Mood }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Quotes', { moodId: item.id })}
        style={[styles.card, { backgroundColor: item.tint, borderColor: item.accent }]}
        testID={`mood-${item.id}`}
        accessibilityRole="button"
        accessibilityLabel={`${item.label}, ${item.description}`}>
        <View style={[styles.monogram, { backgroundColor: item.accent }]}>
          <AppText variant="label" color={theme.colors.surface}>
            {item.monogram}
          </AppText>
        </View>
        <View style={styles.cardText}>
          <AppText variant="title" style={styles.cardTitle}>
            {item.label}
          </AppText>
          <AppText variant="body" color={theme.colors.inkMuted}>
            {item.description}
          </AppText>
        </View>
      </Pressable>
    );
  };

  return (
    <Screen testID="mood-selection-screen">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <AppText variant="label" color={theme.colors.inkSubtle}>
          HOW ARE YOU FEELING?
        </AppText>
        <AppText variant="title" style={styles.headerTitle}>
          Pick a mood
        </AppText>
        <AppText variant="body" color={theme.colors.inkMuted}>
          Tap a mood to see quotes tailored to it.
        </AppText>
      </View>
      <FlatList
        data={moods}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  monogram: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: theme.spacing.xs,
  },
});
