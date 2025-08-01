export interface WoodType {
  id: number;
  commonName: string;
  scientificName: string;

  technicalSheet: {
    family: string;
    origin: string;
    color: string;
    grain: string;
    texture: string;
  };
}