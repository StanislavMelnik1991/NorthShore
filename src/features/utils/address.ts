import {
  IApartmentFull,
  IBuildingFull,
  IEntranceFull,
  IStreet,
} from '@entities/types';

interface Props {
  apartment?: Partial<IApartmentFull> | null;
  entrance?: Partial<IEntranceFull> | null;
  building?: Partial<IBuildingFull> | null;
  street?: Partial<IStreet> | null;
}

export const formatAddress = ({
  apartment,
  building,
  entrance,
  street,
}: Props) => {
  const currentEntrance = entrance || apartment?.entrance;
  const currentBuilding = building || currentEntrance?.building;
  const currentStreet = street || currentBuilding?.street;

  const resultArr: Array<string> = [];

  if (currentStreet) {
    resultArr.push((currentStreet.name as string).trim());
  }
  if (currentStreet && currentBuilding) {
    resultArr.push(', ');
  }
  if (currentBuilding) {
    resultArr.push((currentBuilding.name as string).trim());
  }
  if (resultArr.length && currentEntrance) {
    resultArr.push(', ');
  }
  if (currentEntrance) {
    resultArr.push((currentEntrance.name as string).trim());
  }
  if (resultArr.length && apartment) {
    resultArr.push(', ');
  }
  if (apartment) {
    resultArr.push((apartment.name as string).trim());
  }

  return resultArr.join('');
};
