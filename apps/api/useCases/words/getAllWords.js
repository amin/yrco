import * as wordsRepo from "../../repositories/wordsRepository.js";

export const getAllWords = async () => wordsRepo.findAll();
