import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from './string.util';

/**
 * 将 TypeORM 自定生成的报名格式化成 t_user_log
 *
 * @export
 * @class CustomNamingStrategy
 * @extends {DefaultNamingStrategy}
 * @implements {NamingStrategyInterface}
 */
export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : `t_${snakeCase(targetName)}`;
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
