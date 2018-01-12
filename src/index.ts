import { Widget } from '@phosphor/widgets'
import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application'

import {
  IDocumentManager
} from '@jupyterlab/docmanager';

import { ICommandPalette } from '@jupyterlab/apputils'
import * as React from 'react'
import * as ReactDom from 'react-dom'

import '../style/index.css'
import Component from './component'


const activate = (app: JupyterLab, palette: ICommandPalette, documentManager: IDocumentManager) => {
  console.log('Extension jupyterlab_tfrecord_viewer is activated!')
  console.log('ICommandPalette:', palette)


  // DOM manipulation

  let widget: Widget = new Widget()
  widget.id = 'jupyterlab_tfrecord_viewer'
  widget.title.label = 'TFRecord'
  widget.title.closable = true
  widget.node.style.cssText = 'overflow: auto;'

  let reactContent = document.createElement('div')
  widget.node.appendChild(reactContent)

  ReactDom.render(React.createElement(Component, {/*props*/}), reactContent)


  // Command palette

  const command = 'jupyterlab_tfrecord_viewer:open'
  app.commands.addCommand(command, {
    label: 'TFRecord Browser',
    execute: () => {

      if (!widget.isAttached)
        app.shell.addToMainArea(widget)
      
      app.shell.activateById(widget.id)
    }
  })

  palette.addItem({command, category: 'Experimental'})

  console.log('Still kicking...')
}

const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_tfrecord_viewer',
  autoStart: true,
  requires: [ ICommandPalette, IDocumentManager ],
  activate,
}

export default extension
