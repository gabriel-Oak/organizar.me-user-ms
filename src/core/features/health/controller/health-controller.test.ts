import { FastifyReply, FastifyRequest } from 'fastify';
import { mock, mockDeep, mockReset } from 'jest-mock-extended';
import HealthController from './index';

describe('HealthController Tests', () => {
  const requestMock = mock<FastifyRequest>();
  const replyMock = mockDeep<FastifyReply>({ funcPropSupport: true });
  const controller = new HealthController();

  beforeEach(() => {
    mockReset(requestMock);
    mockReset(replyMock);
    replyMock.code.mockImplementation(() => replyMock);
  });

  it('Should return OK', async () => {
    await controller.health(requestMock, replyMock);

    expect(replyMock.send).toHaveBeenCalledWith({ status: 'OK' });
  });
});
