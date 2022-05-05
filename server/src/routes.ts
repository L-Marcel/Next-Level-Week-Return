import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmiteFeedbackUseCase } from "./useCases/submitFeedbackUseCase";

const routes = express.Router();

routes.post("/feedbacks", async(req, res) => {
  const { type, comment, screenshot } = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submiteFeedbackUseCase = new SubmiteFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );
  
  await submiteFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).send();
});

export { routes };
