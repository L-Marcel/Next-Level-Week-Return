import { SubmiteFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new SubmiteFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("Should be able to submit a feedback", () => {
    expect(submitFeedback.execute({
      type: "BUG",
      comment: "Example comment",
      screenshot: "data:image/png;base64"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  })

  it("Should not be able to submit a feedback without a type", () => {
    expect(submitFeedback.execute({
      type: "",
      comment: "Example comment",
      screenshot: "data:image/png;base64"
    })).rejects.toThrow();
  })

  it("Should not be able to submit a feedback without a comment", () => {
    expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64"
    })).rejects.toThrow();
  })

  it("Should not be able to submit a feedback with an invalid screenshot", () => {
    expect(submitFeedback.execute({
      type: "BUG",
      comment: "Example comment",
      screenshot: ""
    })).rejects.toThrow();
  })
});