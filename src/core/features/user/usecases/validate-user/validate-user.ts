import { z, ZodError, ZodIssue } from 'zod';
import { Left, Right } from '../../../../utils/types';
import { IValidateUserUsecase, ValidateUserError } from './types';
import Injectable from '../../../../utils/decorators/injectable';
import { UserProps } from '../../entities/user';

@Injectable('IValidateUserUsecase')
export default class ValidateUserUsecase implements IValidateUserUsecase {
  execute(user: UserProps) {
    try {
      const userSchema = z.object({
        name: z.string().min(3).max(250),
        email: z.string().email(),
        password: z.string().min(6).max(20)
      });
      userSchema.parse(user);
      return new Right(null);
    } catch (e) {
      let message = ((e as ZodError).errors).reduce(
        (prev: string, current: ZodIssue, index: any) => `${prev}${!index ? ' ' : ', '}${(current).path.join(', ')}`,
        'Desculpe, você precisa informar um'
      );
      message += ' válido';
      return new Left(new ValidateUserError(message + '.', e));
    }
  }
}
