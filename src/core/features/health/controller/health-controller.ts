import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../../../utils/decorators/controller/controller';
import Get from '../../../utils/decorators/controller/get';

@Controller('/health')
export default class HealthController {
  @Get('/')
  async health(_: FastifyRequest, reply: FastifyReply) {
    return await reply.send({ status: 'OK' });
  }
}
