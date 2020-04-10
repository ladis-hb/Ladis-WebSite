import { ParameterizedContext } from "koa";
import { Query } from "server/Event/Event";


export interface KoaCtx extends ParameterizedContext {
  $Query:Query
}
