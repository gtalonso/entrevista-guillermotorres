import { use } from "chai";
import CardRepository from "../domain/cardRepository.js";

class CardRepositoryImp extends CardRepository {
  constructor(model) {
    super(model);
  }

  save(card) {
    this.model.create(card, (err, newCard) => {
      if (err) return handleError(err);
    });
  }

  getByUserId(userId) {
    return this.model.find({ userId: String(userId) }).lean();
  }
}
