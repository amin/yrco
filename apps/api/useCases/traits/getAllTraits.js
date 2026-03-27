import * as traitsRepo from "../../repositories/traitsRepository.js";

export const getAllTraits = async () => traitsRepo.findAll();
