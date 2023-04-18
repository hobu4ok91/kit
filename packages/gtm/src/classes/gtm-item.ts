export class GtmItem {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string | null;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  price?: number;
  quantity?: number;
  discount?: number;
  coupon?: string;
  // https://developers.google.com/maps/documentation/places/web-service/place-id?hl=ru
  location_id?: string;
  item_list_name?: string;

  constructor(
    payload: Pick<
      GtmItem,
      "item_id" | "item_name" | "item_brand" | "item_category"
    > &
      Partial<GtmItem>
  ) {
    this.item_id = payload.item_id;
    this.item_name = payload.item_name;
    this.item_brand = payload.item_brand;
    this.item_category = payload.item_category;

    Object.assign(this, payload);
  }
}
