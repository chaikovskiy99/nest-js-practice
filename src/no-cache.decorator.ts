import { SetMetadata } from '@nestjs/common';

export const NoCache = () =>  SetMetadata('ignore', true)