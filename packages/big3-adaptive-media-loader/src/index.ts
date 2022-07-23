const loaderUtils = require('loader-utils')
const path = require('path')

const AdaptiveMediaLoader = function(this: any, source: string) {
  const options = loaderUtils.getOptions(this)
  const { designDraft } = options as { designDraft: any | any[] }
  switch (Object.prototype.toString.call(designDraft)) {
    case '[object Number]': {
      return `@media (min-width: ${designDraft}px){${source}}`
    }
    case '[object String]': {
      return `@media (min-width: ${designDraft}px){${source}}`
    }
    case '[object Array]': {
      return `@media (min-width: ${designDraft[0]}px) and (max-width: ${designDraft[1]}px){${source}}`
    }
    default:
      return source
  }
}

export const withChainWebpack = (chain: any, drafs: { rule: string; regex: RegExp; designDraft: any | any[] }[]) => {
  for (const draf of drafs) {
    chain.module
      .rule(draf.rule)
      .test(draf.regex)
      .exclude.add(path.resolve('node_modules'))
      .end()
      .use('AdaptiveMediaLoader')
      .loader(require.resolve(__dirname))
      .options({ designDraft: draf.designDraft })
  }
}

export default AdaptiveMediaLoader
