import { Widget } from '@phosphor/widgets'
import {
  JupyterLab, JupyterLabPlugin 
} from '@jupyterlab/application'
import { ICommandPalette } from '@jupyterlab/apputils'
import '../style/index.css'

import {
  // KernelMessage,
  Kernel,
} from '@jupyterlab/services'

/**
 * Thoughts on flow:
 * 
 * Could show metadata first.
 * Next, whether to use tf.train.Example
 * Next, how many you want
 */

async function runReader(onResult: (s:  string) =>  any) {

  const kernelSpecs = await Kernel.getSpecs()

  const kernel = await Kernel.startNew({
    name: kernelSpecs.default
  })

  const execution = kernel.requestExecute({code: `
import tensorflow as tf
from google.protobuf.json_format import MessageToJson

try:
    record_path = '/home/max/projects/jupyterlab_tfrecord_viewer/sample_record.record'

    record_iterator = tf.python_io.tf_record_iterator(path=record_path)

    all_features = []
    for str_record in record_iterator:
        example = tf.train.Example()
        example.ParseFromString(str_record)
        features = str(example.features)
        # features = MessageToJson(example.features)
        all_features.append(features)

    print("\\n".join(all_features))

except:
    print('Failed to read record')
  `})

  execution.done.then(() => {
    // console.log('Future is fulfilled')
  })
  execution.onIOPub = msg => {
    console.log('msg content', msg.content)  // Print rich output data.

    if (msg.content.name === 'stdout')
      onResult(msg.content.text as string)
  }
}

const activate = (app: JupyterLab, palette: ICommandPalette) => {
  console.log('Extension jupyterlab_tfrecord_viewer is activated!')
  console.log('ICommandPalette:', palette)

  let widget: Widget = new Widget()
  widget.id = 'jupyterlab_tfrecord_viewer'
  widget.title.label = 'TFRecord'
  widget.title.closable = true

  let p = document.createElement('p')
  p.style.cssText = "white-space: pre-wrap;"
  widget.node.appendChild(p)
  p.innerHTML = 'Loading Tensorflow Dataset'

  runReader(res => {
    // want to clean out all the binary
    const cleaned = res.replace(/b\'(.|\n)*\'/g, '{binary...}')
    p.innerHTML = cleaned
  })

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
  requires: [ ICommandPalette ],
  activate,
}

export default extension


// let img = document.createElement('img')
// widget.node.appendChild(img)

//  b\'(.|\n)*\'
    // let cleaned = []
    // let sawB = false
    // for (let i = 0; i < res.length; i++) {
    //   let c = res[i]
    //   let prev = i === 0 ? 'a' : res[i-1]
      
    //   if (c === 'b')
    //     sawB = true
    //   else
    //     sawB = false
    // }

// fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response => {
  //   return response.json()
  // }).then(data => {
  //   img.src = data.img
  //   img.alt = data.title
  //   img.title = data.alt
  // })