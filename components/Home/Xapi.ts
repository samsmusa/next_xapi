import XAPI, { Actor, Statement } from '@xapi/xapi';

export interface Obj {
  id: string;
  objectType: string;
  definition: {
    name: {
      [key: string]: string;
    };
    description: {
      [key: string]: string;
    };
    type: string;
  };
}
export interface cont {
  contextActivities: {
    category: [
      {
        id: string;
        objectType: string;
        definition: {
          name: {
            [key: string]: string;
          };
        };
      }
    ];
  };
  extensions: {
    [key: string]: any;
  };
}

export interface XAPIStatement {
  actor: Actor;
  object: Obj;
  context: cont;
  timestamp: string;
  version: string;
  authority: {
    mbox: string;
    name: string;
  };
}

export class XAPIClient {
  private static instance: XAPIClient;

  private xapi: XAPI;

  private constructor() {
    const endpoint = 'https://cloud.scorm.com/lrs/61G2CX2714/sandbox/';
    const username = 'wEdoyPW7CI4i6ccHOqg';
    const password = 'ZI4haFDtrSAQ7Lctrr8';
    const auth = XAPI.toBasicAuth(username, password);
    this.xapi = new XAPI({
      endpoint: endpoint,
      auth: auth,
    });
  }

  public static getInstance(): XAPIClient {
    if (!XAPIClient.instance) {
      XAPIClient.instance = new XAPIClient();
    }
    return XAPIClient.instance;
  }

  public sendStatement(obj: any) {
    console.log({
      statement: obj,
    });
    const xapi = XAPIClient.getInstance();
    const statements: Statement = {
      actor: {
        mbox: 'mailto:user@example.com',
        name: 'Muhammad',
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/experienced',
        display: {
          'en-US': 'experienced',
        },
      },
      object: {
        id: 'http://example.com/activities/example-activity',
        definition: {
          name: {
            'en-US': 'example title',
          },
          description: {
            'en-US': 'An example activity',
          },
        },
      },
      context: {
        extensions: {
          'http://example.com/extensions/score': {
            raw: 75,
            scaled: 0.75,
            min: 0,
            max: 100,
          },
        },
      },
      ...obj,
    };
    console.log({
      statement: statements,
    });

    xapi.xapi
      .sendStatement({
        statement: statements,
      })
      .then((result) => {
        console.log('Statement sent successfully:', result.data);
      })
      .catch((error) => {
        console.error('Error sending statement:', error);
      });
  }
}
