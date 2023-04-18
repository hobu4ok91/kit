import { GtmEventName } from "~/consts";

const ecommerceEventsMap = [
  GtmEventName.viewItem,
  GtmEventName.viewCart,
  GtmEventName.selectItem,
  GtmEventName.addToCart,
  GtmEventName.removeFromCart,
  GtmEventName.beginCheckout,
  GtmEventName.purchase,
];

export function isEcommerce(event: GtmEventName): boolean {
  return ecommerceEventsMap.includes(event);
}
