import CardRepository from "../domain/cardRepository.js";

class CardRepositoryImp extends CardRepository {
  constructor(model) {
    super(model);
  }

  save(card) {
    return new this.model(card)
      .save()
      .then((doc) => ({
        cardType: doc.cardType,
        userId: doc.userId,
        primary: doc.primary,
      }))
      .catch((err) => err);
  }

  findByUserId(userId) {
    return this.model
      .find({ userId: String(userId) })
      .select("userId brandType maskedNumber primary -_id")
      .lean();
  }
}

export default CardRepositoryImp;
