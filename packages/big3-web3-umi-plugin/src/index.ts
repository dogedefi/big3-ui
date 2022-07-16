import { IApi, utils } from 'umi'
import { join } from 'path'
import providerContent from './utils/getProviderContent'
import getModelContent from './utils/getModelContent'
import getExportContent from './utils/getExportContent'
import { DIR_NAME, RELATIVE_MODEL, RELATIVE_MODEL_PATH, RELATIVE_EXPORT, RELATIVE_EXPORT_PATH } from './constants'
import { readFileSync } from 'fs'

const { winPath } = utils

export default (api: IApi) => {
  api.addRuntimePlugin({
    fn: () => '../plugin-web3/runtime',
    // 调整顺序 https://github.com/alitajs/umi-plugin-keep-alive/issues/16
    stage: -1 * Number.MAX_SAFE_INTEGER
  })

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: winPath(`../${RELATIVE_EXPORT}`)
    }
  ])

  api.register({
    key: 'addExtraModels',
    fn: () => [
      {
        absPath: winPath(join(api.paths.absTmpPath!, RELATIVE_MODEL_PATH)),
        namespace: '@@chain'
      }
    ]
  })

  api.addTmpGenerateWatcherPaths(() => ['./app.ts', './app.js', './app.jsx', './app.tsx'])

  api.onGenerateFiles(async () => {
    api.writeTmpFile({
      path: winPath(join(DIR_NAME, 'Provider.tsx')),
      content: providerContent
    })

    api.writeTmpFile({
      path: winPath(RELATIVE_EXPORT_PATH),
      content: getExportContent(RELATIVE_MODEL)
    })

    api.writeTmpFile({
      path: RELATIVE_MODEL_PATH,
      content: getModelContent()
    })

    api.writeTmpFile({
      path: 'plugin-web3/runtime.tsx',
      content: utils.Mustache.render(readFileSync(join(__dirname, 'runtime.tsx.tpl'), 'utf-8'), {})
    })
  })
}
