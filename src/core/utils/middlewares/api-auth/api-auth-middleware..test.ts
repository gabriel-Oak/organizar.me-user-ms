import { FastifyReply, FastifyRequest } from 'fastify';
import { mock, mockDeep, mockReset } from 'jest-mock-extended';
import { IApiAuthMiddleware } from './types';
import ApiAuthMiddleware from './api-auth-middleware';
import { ILoggerService } from '../../services/logger/types';
import HttpError from '../../errors/http-error';
import { API_TOKEN } from '../../constants';

describe('ApiAuthMiddleware Tests', () => {
  const requestMock = mock<FastifyRequest>({
    ip: '255.255.255.255'
  });
  const replyMock = mockDeep<FastifyReply>({ funcPropSupport: true });
  const loggerMock = mock<ILoggerService>();

  const apiAuthMiddleware: IApiAuthMiddleware = new ApiAuthMiddleware(loggerMock);

  beforeEach(() => {
    mockReset(requestMock);
    mockReset(replyMock);
    mockReset(loggerMock);
    replyMock.code.mockReturnThis();
  });

  it('Should deny a request', async () => {
    await apiAuthMiddleware.execute({
      ...requestMock,
      headers: {
        'api-token': 'nopass'
      }
    }, replyMock);

    expect(replyMock.code).toHaveBeenCalledWith(401);
    expect(replyMock.send).toHaveBeenCalledWith(new HttpError({
      statusCode: 401,
      message: 'Acesso não autorizado'
    }));
  });

  it('Should foward a request', async () => {
    await apiAuthMiddleware.execute({
      ...requestMock,
      headers: {
        'api-token': API_TOKEN
      }
    }, replyMock);

    expect(replyMock.send).not.toHaveBeenCalled();
  });
});
