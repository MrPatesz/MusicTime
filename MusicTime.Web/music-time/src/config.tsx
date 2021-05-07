interface IConfig {
  apiUrl: string;
  picturePath: string;
}

export const Config: IConfig = {
  apiUrl: "https://localhost:5001/api/",
  picturePath: "https://localhost:5001/Pictures/",
};
