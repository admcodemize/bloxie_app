/**
 * @public
 * @author Marc Stöckli - Codemize GmbH
 * @description Convex handler promise props which is used for returning errors from actions
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type ConvexHandlerPromiseProps = { 
  hasErr: boolean;
  err?: ConvexHandlerError|ConvexHandlerError[];
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Convex handler error object which is used for returning errors from actions
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type ConvexHandlerError = {
  code: number;
  info: string;
  severity: string;
  name: string;
}