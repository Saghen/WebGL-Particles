class MiddlewareKernel {
  middleware = [];
  afterMiddleware = [];
  props = {};

  use = (func) => {
    this.middleware.push(func);
  };

  useAfter = (func) => {
    this.afterMiddleware.push(func);
  };

  run = (props, ...options) => {
    this.props = props;
    for (const func of this.middleware) func(props, ...options);

    if (!this.props.forceAborted)
      for (const func of this.afterMiddleware) func(props, ...options);

    this.props.aborted = false
    this.props.forceAborted = false;
    return props;
  };

  // Note: This has to be implemented in each middleware
  abort = ({ force } = {}) => {
    this.props.aborted = true;
    this.props.forceAborted = Boolean(force);
  };
}

export default MiddlewareKernel;
