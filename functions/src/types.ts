interface Org {
  name: string;
  admins: {
    [uid: string]: true;
  };
  createdAt: object | number;
}

interface OrgApps {
  [orgId: string]: {
    [appId: string]: true;
  };
}

interface App {
  name: string;
  keys: {
    [key: string]: true;
  };
  admins: {
    [uid: string]: true;
  };
  mode: 'UNSECURED' | 'SECURED';
}
