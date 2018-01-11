import * as React from 'react'
import JSONTree from 'react-json-tree';
import { executePython, readAllExamplesPythonCode, cleanBinary } from './python'

const myPath = '/home/max/projects/jupyterlab_tfrecord_viewer/sample_record.record'

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
      path: myPath,
      data: null,
    }
  }

  componentDidMount() {
    executePython(readAllExamplesPythonCode(this.state.path),
      res => {
        const cleaned = cleanBinary(res)
        this.setState({data: cleaned})
      }
    )
  }

  onRequestLoad = () => {
    executePython(readAllExamplesPythonCode(this.state.path),
      res => {
        const cleaned = cleanBinary(res)
        this.setState({data: cleaned})
      }
    )
  }

  handlePathChange = (event: any) => {
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
