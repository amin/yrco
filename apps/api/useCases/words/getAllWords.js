import * as wordsRepo from "../../repositories/wordsRepository.js";

export const getAllWords = async () => Object.values(await wordsRepo.findAll());
