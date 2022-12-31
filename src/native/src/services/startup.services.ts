import { ItemsService } from "./items";

interface ServiceCache {
  ItemsServices: ItemsService;
}

const _services_cache: ServiceCache = {
  ItemsServices: undefined,
};

export const ServiceResolver = {
  get ItemsService() {
    if (!_services_cache.ItemsServices) {
      _services_cache.ItemsServices = new ItemsService();
    }
    return _services_cache.ItemsServices;
  },
};
