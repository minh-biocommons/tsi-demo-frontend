export interface IDataset {
  title: string;
  type: string;
  id: string;
  url: string;
  notes: string;
  resources: Array<any>;
  formats: Array<string>;
  size: string;
}
