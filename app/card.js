import CardRepository from "../domain/cardRepository.js";

class CardRepositoryImp extends CardRepository {
  constructor(model) {
    super(model);
  }

  save(card) {
    return new this.model(card)
      .save()
      .then(({ brandType, maskedNumber, userId, primary }) => ({
        brandType: brandType,
        maskedNumber: maskedNumber,
        userId: userId,
        primary: primary,
      }))
      .catch((err) => err);
  }

  findByUserId(userId) {
    return this.model
      .find({ userId: String(userId) })
      .select("-_id -__v")
      .lean();
  }

  async isFirstCard(userId) {
    const count = await this.model.countDocuments({ userId: String(userId) });
    if (count > 0) return false;
    return true;
  }
}

export default CardRepositoryImp;
