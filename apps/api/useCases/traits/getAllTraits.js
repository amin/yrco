import * as traitsRepo from "../../repositories/traitRepository.js";

export const getAllTraits = async () => traitsRepo.findAll();
