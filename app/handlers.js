import Card from "../domain/card.js";
import CardRepositoryImp from "./card.js";
import { CardModel } from "./db/models.js";

class CardHandler {
  static saveCard(req) {
    let card = new Card(req.body, new CardRepositoryImp(CardModel));
    return card.create();
  }

  static getCards(req) {
    return Card.getByUserId(req.query.userId, new CardRepositoryImp(CardModel));
  }
}

export default CardHandler;
