import * as FileSystem from "expo-file-system";
import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureScreen } from "react-native-view-shot";
import { api } from '../../services/api';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';

import { styles } from './styles';

interface Props {
  feedbackType: FeedbackType;
  onCancelFeedback: () => void;
  onSentFeedback: () => void;
};

export function Form({
  feedbackType,
  onCancelFeedback,
  onSentFeedback
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const { title, image } = feedbackTypes[feedbackType];

  function handleOnTakeShot() {
    captureScreen({
      format: "jpg",
      quality: .8
    })
    .then(uri => setScreenshot(uri))
    .catch(err => console.log(err));
  };

  function handleOnRemoveShot() {
    setScreenshot(null);
  };

  async function handleSubmitFeedback() {
    if(isLoading) {
      return;
    };

    try {
      setIsLoading(true);

      const screenshotBase64 = screenshot && 
      await FileSystem.readAsStringAsync(screenshot, {
        encoding: "base64"
      });

      console.log(screenshot, screenshotBase64?.length);

      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment 
      });

      onSentFeedback();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onCancelFeedback}
        >
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View
          style={styles.titleContainer}
        >
          <Image
            source={image}
            style={styles.image}
          />
          <Text
            style={styles.titleText}
          >
            {title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View
        style={styles.footer}
      >
        <ScreenshotButton
          onTakeShot={handleOnTakeShot}
          onRemoveShot={handleOnRemoveShot}
          screenshot={screenshot}
        />
        <Button
          isLoading={isLoading}
          onPress={handleSubmitFeedback}
        />
      </View>
    </View>
  );
}