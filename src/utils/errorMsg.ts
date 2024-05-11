import { ERR_CODE } from "./constants";

export const errorMsg = (errorCode: string) => {
  switch (errorCode) {
    case ERR_CODE.NOT_FOUND:
      return "notFound";
    case ERR_CODE.USER_NOT_FOUND:
      return "userNotFound";
    case ERR_CODE.CIRCLE_REFERRAL_NOT_ALLOWED:
      return "circleReferralNotAllowed";
    case ERR_CODE.NOT_TX_OWNER:
      return "notTxOwner";
    case ERR_CODE.CONFIRMATION_TOO_LOW:
      return "confirmationTooLow";
    case ERR_CODE.INVALID_CURRENCY:
      return "invalidCurrency";
    case ERR_CODE.INVALID_TX_FUNCTION:
      return "invalidTxFunction";
    case ERR_CODE.INVALID_PURCHASE_PRICE:
      return "invalidPurchasePrice";
    case ERR_CODE.INVALID_DEPOSIT_ADDRESS:
      return "invalidDepositAddress";
    case ERR_CODE.NO_VACANT_GIFTBOX:
      return "noVacantGiftbox";
    case ERR_CODE.GIFTBOX_NOT_AVAILABLE:
      return "giftboxNotAvailable";
    case ERR_CODE.INVALID_SIGNATURE:
      return "invalidSignature";
    case ERR_CODE.NOT_GIFTBOX_OWNER:
      return "notGiftboxOwner";
    case ERR_CODE.TX_HASH_USED:
      return "txHashUsed";
    case ERR_CODE.USER_LOCKED:
      return "userLocked";
    case ERR_CODE.INVALID_CAPTCHA_TOKEN:
      return "invalidCaptchaToken";
    case ERR_CODE.MAX_GIFTBOX_CAPACITY_REACHED:
      return "maxGiftboxCapacityReached";
    case ERR_CODE.OTHER_BOX_LOCKED:
      return "otherBoxLocked";
    case ERR_CODE.ALREADY_BOUGHT:
      return "alreadyBought";
    case ERR_CODE.MAX_SPIN_REACHED:
      return "maxSpinReached";
    case ERR_CODE.NO_MORE_SPIN_SLOTS:
      return "noMoreSpinSlots";
    case ERR_CODE.END_OF_TURN:
      return "endOfTurn";
    case ERR_CODE.PRICE_SLID_TOO_MUCH:
      return "priceSlidTooMuch";
    default:
      return "unknownError";
  }
};
