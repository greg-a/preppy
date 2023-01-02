import { ItemsService } from "./items";
import { ShoppingListService } from "./shoppingList";

interface ServiceCache {
  ItemsService: ItemsService;
  ShoppingListService: ShoppingListService;
}

const _services_cache: ServiceCache = {
  ItemsService: undefined,
  ShoppingListService: undefined,
};

export const ServiceResolver = {
  get ItemsService() {
    if (!_services_cache.ItemsService) {
      _services_cache.ItemsService = new ItemsService();
    }
    return _services_cache.ItemsService;
  },
  get ShoppingListService() {
    if (!_services_cache.ShoppingListService) {
      _services_cache.ShoppingListService = new ShoppingListService();
    }
    return _services_cache.ShoppingListService;
  },
};
