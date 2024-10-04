const { env } = import.meta.env;

const ENV = {
  env: env,
} as const;

export { ENV };
