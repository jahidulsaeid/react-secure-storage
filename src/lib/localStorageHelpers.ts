import encryptService from "./encryption";
import { LocalStorageItem } from "./types";

const getAllLocalStorageItems = () => {
  const localStorageItems: LocalStorageItem = {};
  for (const [key, value] of Object.entries(localStorage)) {
    if (key.startsWith("@secure.")) {
      let keyType = key.replace("@secure.", "")[0];
      let decryptedValue = encryptService.decrypt(value);
      let parsedValue = null;
      switch (keyType) {
        case "b":
          parsedValue = decryptedValue === "true";
          break;
        case "j":
          parsedValue = JSON.parse(decryptedValue);
          break;
        case "n":
          parsedValue = Number(decryptedValue);
          break;
        default:
          parsedValue = decryptedValue;
      }
      localStorageItems[key] = parsedValue;
    }
  }
  return localStorageItems;
};

export default getAllLocalStorageItems;