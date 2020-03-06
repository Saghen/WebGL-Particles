class MiddlewareKernel {
  middleware = [];

  use = (func) => {
    this.middleware.push(func);
  }

  run = (props, ...options) => {
    for (const func of this.middleware) func(props, ...options);

    return props;
  }
}

export default MiddlewareKernel;
