import { appName } from "../constants";

export const getMetaTitle = (fragments: (string | undefined | null)[] = []) =>
  [...fragments, appName].filter(Boolean).join(" - ");
