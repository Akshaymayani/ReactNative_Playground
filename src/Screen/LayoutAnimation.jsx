import Animated, {FadeOut, LinearTransition, SequencedTransition} from 'react-native-reanimated';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { HeightTransition } from '../utility/AnimateHeight';

const INITIAL_LIST = [
  { id: 1, emoji: '🇮🇳', color: '#2e425a' },
  { id: 2, emoji: '🇬🇧', color: '#364d69' },
  { id: 3, emoji: '🇫🇷', color: '#3e5878' },
  { id: 4, emoji: '🇯🇵', color: '#466387' },
  { id: 5, emoji: '🇧🇷', color: '#4e6e97' },
  { id: 6, emoji: '🇩🇪', color: '#5f7ca1' },
  { id: 7, emoji: '🇨🇦', color: '#718bab' },
  { id: 8, emoji: '🇦🇺', color: '#8399b6' },
  { id: 9, emoji: '🇮🇹', color: '#94a8c0' },
  { id: 10, emoji: '🇺🇸', color: '#a6b6cb' },
];


export default function App() {
  const [items, setItems] = useState(INITIAL_LIST);
  const [selected] = useState({ label: 'Linear Transition', value: LinearTransition });
  const removeItem = (idToRemove) => {
    const updatedItems = items.filter((item) => item.id !== idToRemove);
    setItems(updatedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Items selected={selected} items={items} onRemove={removeItem} />
    </SafeAreaView>
  );
}

function Items({ selected, items, onRemove }) {
  return (
    <HeightTransition>
      <View style={styles.gridContainer}>
        <Animated.FlatList
          data={items}
          itemLayoutAnimation={SequencedTransition}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <Animated.View
                key={item.id}
                layout={selected.value} // Apply the layout animation here
                exiting={FadeOut} // Apply exit transition here
                style={[styles.tileContainer, { backgroundColor: item.color }]}>
                <Tile emoji={item.emoji} onRemove={() => onRemove(item.id)} />
              </Animated.View>
            );
          }}
        />
      </View>
    </HeightTransition>
  );
}

function Tile({ emoji, onRemove }) {
  return (
    <TouchableOpacity onPress={onRemove} style={styles.tile}>
      <Animated.Text style={styles.tileLabel}>{emoji}</Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
  },

  tileContainer: {
    marginBottom: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    height: 150,
    width:'46%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  tile: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileLabel: {
    color: '#f8f9ff',
    fontSize: 40,
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
});
