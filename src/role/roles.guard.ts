import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '@/role/enum/roles.enum';
import { ROLES_KEY } from '@/role/roles.decorator';

import * as exc from '@base/api/exception.reslover';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const check = requiredRoles.some((role) => user.role?.includes(role));
    if (!check) throw new exc.Forbidden({ message: 'you are not admin' });
    return check;
  }
}
