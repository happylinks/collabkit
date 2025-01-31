import { it, expect } from 'vitest';
import sinon from 'sinon';

import * as functions from 'firebase-functions';

import { routesImpl } from '../routes';

const mockHttp = (props: { url?: string; query?: object; body?: object; headers?: object }) => {
  const req = { headers: { origin: '' }, query: {}, body: {}, ...props } as functions.https.Request;

  return {
    req: req,
    res: {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      set: sinon.stub().returnsThis(),
    } as unknown as functions.Response<any>,
  };
};

it('routing: route not found', async () => {
  const http = mockHttp({ query: {}, body: {} });
  routesImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 404, error: 'Route not found' });
});

it('routing: route works', async () => {
  const http = mockHttp({
    url: `http://example.com/v1/user/`,
    headers: {
      host: 'example.com',
    },
    query: {},
    body: {},
  });
  routesImpl(http.req, http.res);
  const send = http.res.send as sinon.SinonSpy;
  const { args } = send.getCalls()[0];
  expect(args[0]).toEqual({ status: 405, error: 'Method not allowed' });
});
