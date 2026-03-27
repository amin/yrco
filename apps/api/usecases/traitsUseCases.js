import * as traitRepo from "../repositories/traitRepository.js";

export const getAllTraits = async () => traitRepo.findAll();
