const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/alessio.github.io' : '';

export const assetPath = (path: string) => {
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  return path;
};
