/**
 * Представление результата set operation ([asau45]) или upsert opertaion ([asau46])
 *
 * ID [[220108131133]] rev 1 1.0.0 2022-01-08
 */
export enum RsuvEnResultCrudSet {
  /**
   * Была создана новая запись
   */
  CREATED = 'created',
  /**
   * Была обновлена существующая запись
   */
  UPDATED = 'updated',
  /**
   * Возникли проблемы. Новая запись создана не была, текущая обновлена не была
   */
  ERROR = 'error'
}
