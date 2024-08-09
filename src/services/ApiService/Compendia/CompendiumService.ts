import { TCompendium, TGenericPostBasic } from '../../../types'
import { createApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'

export type TCompendiumRequest = {
  name: TCompendium['name'];
  content: TCompendium['content'];
}

export type TCompendiumResponse = TCompendium;

export type TCompendiumIndexResponse = TCompendium[];

const CompendiumService = {
  ...createApiService<TCompendiumRequest, TCompendiumIndexResponse, TCompendiumResponse>('compendia'),
  ...createNotableService('compendia'),
  ...createImageableService('compendia')
};

export default CompendiumService;