import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".";
import { api } from "../../service/api";
import { CloseButton } from "../CloseButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackContentStepProps {
  type: FeedbackType;
  onReturn: () => void;
  onFeedbackSent: () => void;
};

function FeedbackContentStep({
  type,
  onReturn,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const {
    title,
    image
  } = feedbackTypes[type];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    await api.post("/feedbacks", {
      type,
      screenshot,
      comment
    });

    setIsLoading(false);
    onFeedbackSent();
  };

  return (    
    <>
      <header>
        <button
          type="button"
          onClick={onReturn}
          className="
            left-5
            top-5
            absolute
            text-zinc-400
            hover:text-zinc-100
          "
        >
          <ArrowLeft
            weight="bold"
            className="
              w-4
              h-4
            "
          />
        </button>

        <span
          className="
            text-xl
            leading-6
            flex
            items-center
            gap-2
          "
        >
          <img 
            src={image.source} 
            alt={image.alt}
            className="
              w-6
              h-6
            "
          />
          {title}
        </span>
        <CloseButton/>
      </header>
      <form
        onSubmit={handleSubmit}
        className="
          my-4
          w-full
        "
      >
        <textarea
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte com detalhes o que está acontecendo..."
          className="
            min-w-[304px]
            w-full
            min-h-[112px]
            text-sm
            placeholder-zinc-400
            text-zinc-100
            border-zinc-600
            bg-transparent
            rounded-md
            focus:border-brand-500
            focus:ring-brand-500
            focus:ring-1
            focus:outline-none
            resize-none
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-track-rounded-full
            scrollbar-thumb-zinc-700
            scrollbar-thumb-rounded-full
          "
        />

        <footer
          className="
            flex
            mt-2
            gap-2
          "
        >
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isLoading}
            className="
              p-2
              bg-brand-500
              rounded-md
              border-transparent
              flex-1
              flex
              justify-center
              items-center
              text-sm
              hover:bg-brand-300
              focus:outline-none
              focus:ring-offset-2
              focus:ring-offset-zinc-900
              focus:ring-2
              focus:ring-brand-500
              transition-colors
              disabled:opacity-50
              disabled:hover:bg-brand-500
            "
          >
            {
              isLoading? <Loading/>:"Enviar feedback"
            }
          </button>
        </footer>
      </form>
    </>
  );
};

export { FeedbackContentStep };
