import { Logger } from '@nestjs/common';

export function myDeco() {
  return (target: any, propertyKey: string | symbol, index: number) => {
    Logger.debug(target, 'target');
    Logger.debug(propertyKey, 'propertyKey');
    Logger.debug(index, 'index');
  };
}
