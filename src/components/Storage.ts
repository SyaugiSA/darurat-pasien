import { Storage } from "@ionic/storage";

const Store = new Storage();
Store.create();

export const Create = async (key: string, val: any) =>
  await Store.set(key, val);

export const Get = async (key: string) => await Store.get(key);
export const Remove = async (key: string) => await Store.remove(key);
export const Clear = async () => await Store.clear();
