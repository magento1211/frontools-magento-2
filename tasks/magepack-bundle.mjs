import bundle from 'magepack/lib/bundle.js'

import getThemes from '../helpers/get-themes.mjs'
import { env, projectPath, themes } from '../helpers/config.mjs'

function getThemesGlobPattern() {
  const themesNames = getThemes()

  if (themesNames.length === 1) {
    return `${projectPath}${themes[themesNames[0]].dest}/*`
  }

  return `${projectPath}{${themesNames.map(name => themes[name].dest).join(',')}}/*`
}

export default async function() {
  if (!env['c'] && !env['config']) {
    throw 'Please set the config path!'
  }

  const configPath = env.c || env.config
  const themesGlobPattern = getThemesGlobPattern()
  await bundle(configPath, themesGlobPattern)
}
