// Ambient shims for @actual-app/core type-only imports.
//
// @actual-app/core (26.4.0+) ships raw .ts sources under its "exports" field.
// The api package's type bundle imports from several @actual-app/core
// subpaths; if TypeScript is allowed to resolve them to the real .ts files, it
// type-checks those sources and surfaces strict-mode errors that skipLibCheck
// can't suppress (skipLibCheck only applies to .d.ts).
//
// The tsconfig "paths" entries route every @actual-app/core/* import through
// this file. We declare only the symbols actually referenced by our code or
// by @actual-app/api's index.d.ts. Keep in sync with upstream shape changes.

declare module '@actual-app/core/types/models' {
  export type CategoryEntity = {
    id: string;
    name: string;
    is_income?: boolean;
    group: string;
    goal_def?: string;
    template_settings?: { source: 'notes' | 'ui' };
    sort_order?: number;
    tombstone?: boolean;
    hidden?: boolean;
  };

  export type CategoryGroupEntity = {
    id: string;
    name: string;
    is_income?: boolean;
    sort_order?: number;
    tombstone?: boolean;
    hidden?: boolean;
    categories?: CategoryEntity[];
  };

  export type TransactionEntity = {
    id: string;
    is_parent?: boolean;
    is_child?: boolean;
    parent_id?: string;
    account: string;
    category?: string;
    amount: number;
    payee?: string | null;
    notes?: string;
    date: string;
    imported_id?: string;
    imported_payee?: string;
    starting_balance_flag?: boolean;
    transfer_id?: string;
    sort_order?: number;
    cleared?: boolean;
    reconciled?: boolean;
    tombstone?: boolean;
    forceUpcoming?: boolean;
    schedule?: string;
    subtransactions?: TransactionEntity[];
    _unmatched?: boolean;
    _deleted?: boolean;
    error?: {
      type: 'SplitTransactionError';
      version: 1;
      difference: number;
    } | null;
    raw_synced_data?: string | undefined;
    _ruleErrors?: string[];
  };

  export type ImportTransactionEntity = Partial<TransactionEntity> & {
    account: string;
    amount: number;
    date: string;
  };

  export type RuleEntity = {
    id: string;
    stage: 'pre' | null | 'post';
    conditionsOp: 'or' | 'and';
    conditions: RuleConditionEntity[];
    actions: RuleActionEntity[];
    tombstone?: boolean;
  };

  export type RuleConditionEntity = {
    field: string;
    op: string;
    value: unknown;
    options?: {
      inflow?: boolean;
      outflow?: boolean;
      month?: boolean;
      year?: boolean;
    };
    conditionsOp?: 'and' | 'or';
    type?: 'id' | 'boolean' | 'date' | 'number' | 'string';
    customName?: string;
    queryFilter?: Record<string, { $oneof: string[] }>;
  };

  export type RuleActionEntity = {
    field?: string;
    op: string;
    value: unknown;
    options?: Record<string, unknown>;
    type?: string;
  };
}

declare module '@actual-app/core/server/api-models' {
  export type APIAccountEntity = {
    id: string;
    name: string;
    offbudget?: boolean;
    closed?: boolean;
    balance_current?: number | null;
  };

  export type APICategoryEntity = {
    id: string;
    name: string;
    is_income?: boolean;
    hidden?: boolean;
    group_id: string;
  };

  export type APICategoryGroupEntity = {
    id: string;
    name: string;
    is_income?: boolean;
    hidden?: boolean;
    categories?: APICategoryEntity[];
  };

  export type APIPayeeEntity = {
    id: string;
    name: string;
    transfer_acct?: string | null;
  };

  export type APIScheduleEntity = {
    id: string;
    rule: string;
    active: boolean;
    completed: boolean;
    posts_transaction: boolean;
    tombstone?: boolean;
    name?: string | null;
    next_date?: string;
  };

  export type APITagEntity = {
    id: string;
    tag: string;
    color?: string | null;
    description?: string | null;
  };

  export type APIFileEntity = {
    id?: string;
    cloudFileId: string;
    groupId?: string | null;
    name: string;
    encryptKeyId?: string | null;
    hasKey?: boolean;
    owner?: string | null;
    usersWithAccess?: Array<unknown>;
    state?: 'remote';
  };
}

declare module '@actual-app/core/types/api-handlers' {
  export type ImportTransactionsOpts = {
    learnCategories?: boolean;
    runTransfers?: boolean;
  };
}

declare module '@actual-app/core/server/main' {
  export type InitConfig = {
    dataDir?: string;
    serverURL?: string;
    password?: string;
    token?: string;
  };
  export const lib: unknown;
}

declare module '@actual-app/core/shared/query' {
  export class Query {
    constructor(state?: unknown);
  }
}
