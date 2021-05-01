import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './jwt-auth.guard'

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard))
}
