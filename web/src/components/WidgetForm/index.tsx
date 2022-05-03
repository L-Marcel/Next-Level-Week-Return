import { useState } from "react";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackContentStep } from "./FeedbackContentStep";
import { FeedbackSuccessStep } from "./FeedbackSuccessStep";
import { FeedbackTypeStep } from "./FeedbackTypeStep";


export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento"
    }
  }
};

export type FeedbackType = keyof typeof feedbackTypes;

function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  };

  return (
    <div
      className="
        bg-zinc-900
        p-4
        relative
        rounded-2xl
        mb-4
        flex
        flex-col
        items-center
        shadow-lg
        md:w-auto
        w-[calc(100vw-2rem)]
      "
    >
      {!feedbackType? (
        <FeedbackTypeStep
          onSetFeedbackType={setFeedbackType}
        />
      ):(
        <>
          { feedbackSent? (
            <FeedbackSuccessStep
              onFeedbackRestartRequested={handleRestartFeedback}
            />
          ):(
            <FeedbackContentStep
              type={feedbackType}
              onReturn={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer>
        Feito com 💜 pela <a
          className="
            underline
            underline-offset-2
          "
          href="https://rocketseat.com.br"
        >Rocketseat</a>
      </footer>
    </div>
  );
};

export { WidgetForm };
