import * as React from 'react'
import JSONTree from 'react-json-tree';
import { executePython, readAllExamplesPythonCode } from './python'


export type TFRecordProps = {
}
export type TFRecordState = {
  path: string
  data: any
}
export class TFRecordViewerComponent extends React.Component<TFRecordProps, TFRecordState> {

  constructor(props: TFRecordProps) {
    super(props)
    this.state = {
      path: '/home/max/projects/jupyterlab_tfrecord_viewer/sample_record.record',
      data: null,
    }
  }

  componentDidMount() {
    executePython(readAllExamplesPythonCode,
      res => {
        // want to clean out all the binary
        const cleaned = res.replace(/b\'(.|\n)*\'/g, '{binary...}')

        this.setState({data: cleaned})
      }
    )
  }

  onRequestLoad = () => {
    console.log('onRequestLoad')
  }

  handlePathChange = (event: any) => {
    console.log('handlePathChange')
    this.setState({path: event.target.value})
  }

  render() {

    const { data } = this.state
    const parsedData = JSON.parse(data)

    return (
      <div>

        <hr/>
        <input
          style={{width: '50%'}} 
          type="text" 
          value={this.state.path}
          onChange={this.handlePathChange} />

        <button 
          onClick={this.onRequestLoad}>
          WHELP
          </button>
        
        <br/>

        {
          this.state.data
            ? <JSONTree
                data={parsedData}
                />
            : 'Loading data...'
        }
        
      </div>
    )
  }
}

export default TFRecordViewerComponent


// let textInput = document.createElement('input')
// textInput.value = '/home/max/projects/jupyterlab_tfrecord_viewer/sample_record.record'
// textInput.style.cssText = 'width: calc(100% - 70px);'
// widget.node.appendChild(textInput)

// let button = document.createElement('button')
// button.style.cssText = 'width: 60px;'
// button.innerHTML = 'Load'
// button.onclick = _mouseEvent => console.log('button clicked', textInput.value)
// widget.node.appendChild(button)