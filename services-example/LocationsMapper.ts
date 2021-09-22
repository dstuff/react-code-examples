import uniqBy from 'lodash-es/uniqBy';
import { orderBy as naturalOrderBy } from 'natural-orderby';

import { Language } from '@constants';
import { Country, Farm, House, LocationsData, Region, LocationResponse, Subscription } from 'models';
import { Mapper } from './mapper';

export class LocationsMapper implements Mapper<LocationResponse[], LocationsData> {
  constructor(private readonly language: Language) {}

  map(responses: LocationResponse[]): LocationsData {
    let houses: House[] = [];
    const farms: Farm[] = [];
    const countries: Country[] = [];
    const regions: Region[] = [];

    for (const response of responses) {
      const country: Country | undefined = response.countryCode
        ? Country.createFromCountryCode(response.countryCode, this.language)
        : undefined;
      if (country) {
        countries.push(country);
      }

      const region: Region | undefined = response.regionName
        ? Region.createFromCountry(response.regionName, country)
        : undefined;
      if (region) {
        regions.push(region);
      }

      const farm: Farm = {
        name: response.name,
        id: response.locationId,
        regionId: region?.id,
        countryId: country?.id,
        hasSubscription: response.isSubscribed,
        subscribedServices: response.subscribedServices,
        parentLocations: region ? `${[region.countryName, region.name].join(', ')}` : undefined
      };
      farms.push(farm);

      if (response.childLocations) {
        houses = houses.concat(
          response.childLocations.map((c) => {
            return {
              name: c.name,
              id: c.locationId,
              farmId: farm.id,
              hasSubscription: c.isSubscribed,
              parentLocations: farm?.name,
              subscriptionTypes: LocationsMapper.sortSubscriptions(c.subscribedServices)
            } as House;
          })
        );
      }
    }

    return {
      houses,
      farms: naturalOrderBy(farms, 'name'),
      countries: uniqBy(countries, 'id'),
      regions: uniqBy(regions, 'id')
    };
  }

  private static sortSubscriptions(subscriptions: Subscription[]) {
    return subscriptions.sort();
  }
}
