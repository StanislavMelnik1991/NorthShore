export interface IMockData {
  url: string;
  method: string;
  status: number;
  response: Record<string, unknown>;
  ignoreQueryParams: boolean;
  refreshStoryOnUpdate: boolean;
  disableUsingOriginal: boolean;
  disable: boolean;
}
