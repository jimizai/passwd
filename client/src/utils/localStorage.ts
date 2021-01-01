export class LocationStore {
  public static getItem(key: string, defaultValue: any) {
    return this.parse(localStorage.getItem(key)!, defaultValue);
  }

  public static setItem(key: string, value: any) {
    localStorage.setItem(key, this.stringify(value));
  }

  private static parse(key: string, defaultValue: '') {
    try {
      return JSON.parse(key);
    } catch {
      return defaultValue;
    }
  }

  private static stringify(result: any) {
    return JSON.stringify(result);
  }
}
