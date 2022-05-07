import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

import { FeedbackType } from '..';
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { Option } from '../../Option';
import { Copyright } from '../Copyright';

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
};

export function Options({
  onFeedbackTypeChanged
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>
      <View
        style={styles.options}
      >
        {
          Object.entries(feedbackTypes)
          .map(([key, value]) => {
            return (
              <Option
                key={key}
                onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
                title={value.title}
                image={value.image}
              />
            );
          })
        }
      </View>
      <Copyright/>
    </View>
  );
}