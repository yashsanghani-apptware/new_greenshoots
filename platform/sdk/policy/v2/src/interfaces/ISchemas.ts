export interface ISchemas {
  principalSchema?: ISchema;
  resourceSchema?: ISchema;
}

export interface ISchema {
  ref: string;
  ignoreWhen?: ISchemaIgnoreWhen;
}

export interface ISchemaIgnoreWhen {
  actions: string[];
}

