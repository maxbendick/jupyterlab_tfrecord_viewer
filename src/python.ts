import { Kernel } from '@jupyterlab/services'


export async function executePython(code: string, onResult: (s: string) => any) {
  const kernelSpecs = await Kernel.getSpecs()
  const kernel = await Kernel.startNew({
    name: kernelSpecs.default
  })
  const execution = kernel.requestExecute({code})
  
  execution.done.then(() => {
  })
  execution.onIOPub = msg => {
    console.log('msg content', msg.content)
  
    if (msg.content.name === 'stdout')
      onResult(msg.content.text as string)
  }
}


export const readAllExamplesPythonCode = `
import tensorflow as tf
from google.protobuf.json_format import MessageToJson

try:
    record_path = '/home/max/projects/jupyterlab_tfrecord_viewer/sample_record.record'

    record_iterator = tf.python_io.tf_record_iterator(path=record_path)

    all_features = []
    for str_record in record_iterator:
        example = tf.train.Example()
        example.ParseFromString(str_record)
        # features = str(example.features)
        features = MessageToJson(example.features)
        all_features.append(features)

    print('[')
    print(",\\n".join(all_features))
    print(']')

except:
    print('Failed to read record')
`