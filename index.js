'use strict'

const buildDictionary = require('./build-dictionary')
const changeCase = require('change-case')
const _forEach = require('lodash.foreach')

module.exports = {
  loadController: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/controllers',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, controllers) => {
      if (err) throw err

      _forEach(controllers, (controllerDef, controllerId) => {
        global[changeCase.pascalCase(controllerDef.globalId + ' controllers')] = controllerDef
      })

      cb(null, 'controller-loaded')
    })
  },

  loadHelpers: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/helper',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, services) => {
      if (err) throw err

      _forEach(services, (helperDef, helperId) => {
        global[changeCase.pascalCase(helperDef.globalId + ' helper')] = helperDef
      })

      cb(null, 'helper-loaded')
    })
  },

  loadLibraries: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/libs',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, services) => {
      if (err) throw err

      _forEach(services, (librariesDef, librariesId) => {
        global[changeCase.pascalCase(librariesDef.globalId) + 'Libs'] = librariesDef
      })

      cb(null, 'libraries-loaded')
    })
  },

  loadModels: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/models',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, cb)
  }
}
