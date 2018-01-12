import * as React from 'react'
import JSONTree from 'react-json-tree';
import { executePython, readAllExamplesPythonCode, cleanBinary } from './python'

const myPath = '/home/max/projects/jupyterlab_tfrecord_viewer/sample_record.record'

const defaultMaxMemoryInMegabytes = 50

const parseMemory = (m: string): number =>
  parseFloat(m) || defaultMaxMemoryInMegabytes


export type TFRecordProps = {
}
export type TFRecordState = {
  path: string
  data: any
  maxMemory: string
}
export class TFRecordViewerComponent extends React.Component<TFRecordProps, TFRecordState> {

  constructor(props: TFRecordProps) {
    super(props)
    this.state = {
      path: myPath,
      data: null,
      maxMemory: defaultMaxMemoryInMegabytes.toString()
    }
  }

  componentDidMount() {

    const maxMemoryNum: number = parseMemory(this.state.maxMemory)
    const maxMemory: string = maxMemoryNum.toString()
    
    this.setState({ maxMemory })

    executePython(readAllExamplesPythonCode(this.state.path, maxMemoryNum),
      res => {
        const cleaned = cleanBinary(res)
        this.setState({
          data: cleaned,
          maxMemory: parseMemory(this.state.maxMemory).toString(),
        })
      }
    )
  }

  onRequestLoad = () => {

    const maxMemoryNum: number = parseMemory(this.state.maxMemory)
    const maxMemory: string = maxMemoryNum.toString()
    
    this.setState({ maxMemory })

    executePython(readAllExamplesPythonCode(this.state.path, maxMemoryNum),
      res => {
        const cleaned = cleanBinary(res)
        this.setState({
          data: cleaned,
          maxMemory: parseMemory(this.state.maxMemory).toString(),
        })
      }
    )
  }

  handlePathChange = (event: any) => {
    this.setState({path: event.target.value})
  }

  handleMaxMemoryChange = (event: any) => {
    this.setState({maxMemory: event.target.value})
  }

  render() {

    const { data } = this.state
    let parsedData
    let failure: boolean
    try {
      parsedData = JSON.parse(data)
      failure = false
    }
    catch(e) {
      failure = true
    }


    return (
      <div>

        <div style={{display: 'flex'}}>
          <input
            style={{flex: '1'}}
            type="text" 
            value={this.state.path}
            onChange={this.handlePathChange} />
          <button 
            style={{width: '60px'}}
            onClick={this.onRequestLoad}>
            Load
            </button>
        </div>

        <div>
          Max memory (MB)
          <input
            style={{flex: '1'}}
            type="text" 
            value={this.state.maxMemory}
            onChange={this.handleMaxMemoryChange} />
        </div>

        {
          this.state.data
            ? failure
              ? 'Failed to read record'
              : <JSONTree
                  data={parsedData}
                  />
            : 'Loading data...'
        }
        
      </div>
    )
  }
}

export default TFRecordViewerComponent
