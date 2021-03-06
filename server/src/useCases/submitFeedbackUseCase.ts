import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmiteFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
};

export class SubmiteFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {};

  async execute(request: SubmiteFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error("Type is required");
    } else if(!comment) {
      throw new Error("Comment is required")
    } else if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error("Invalid screenshot format");
    };

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}`,
        screenshot ? `<img src="${screenshot}"/>`:null,
        `</div>`
      ].join('\n')
    });
  };
};