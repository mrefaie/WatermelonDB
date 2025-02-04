declare module '@nozbe/watermelondb/Database' {
  import {
    AppSchema,
    CollectionMap,
    DatabaseAdapter,
    Model,
    TableName,
    Collection,
  } from '@nozbe/watermelondb'
  import { CollectionChangeSet } from '@nozbe/watermelondb/Collection'
  import { Class } from '@nozbe/watermelondb/utils/common'
  import { Observable } from 'rxjs'

  export interface ActionInterface {
    subAction<T>(action: () => Promise<T>): Promise<T>
  }

  export default class Database {
    public adapter: DatabaseAdapter

    public schema: AppSchema

    public collections: CollectionMap

    public constructor(options: { adapter: DatabaseAdapter; modelClasses: Class<Model>[] })

    public batch(...records: (Model | null | void | false | Promise<void>)[]): Promise<void>

    // TODO: action<T>(work: ActionInterface => Promise<T>, description?: string): Promise<T>
    public action<T>(work: any, description?: string): Promise<T>

    public withChangesForTables(
      tables: Array<TableName<any>>,
    ): Observable<CollectionChangeSet<any> | null>

    public unsafeResetDatabase(): Promise<void>

    public get<T extends Model>(tableName: TableName<T>): Collection<T>
  }
}
