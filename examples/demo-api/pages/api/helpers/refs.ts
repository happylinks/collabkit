import * as FirebaseId from './FirebaseId';
import { admin } from './admin';

export function ref(strings: TemplateStringsArray, ...substitutions: string[]) {
  const path = substitutions.reduce(
    (prev, cur, i) => prev + FirebaseId.encode(cur) + strings[i + 1],
    strings[0]
  );
  return admin.database().ref(path);
}

ref.path = (strings: TemplateStringsArray, ...substitutions: string[]) => {
  const path = substitutions.reduce(
    (prev, cur, i) => prev + FirebaseId.encode(cur) + strings[i + 1],
    strings[0]
  );
  return path;
};
