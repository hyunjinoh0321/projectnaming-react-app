import React, { Component } from 'react';
import PhoneInfo from '../component/PhoneInfo';
import PhoneInfoList from '../component/PhoneInfoList';

class VersionList extends Component {
  name = 'test'
  phone = '010'

  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '이산도',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ]
  }

  handleCreate = () => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, 
                                        name : this.name, 
                                        phone : this.phone})
    })
  }

  render() {
    return (
      <div>
        <input 
            onChange={(event) => {this.setName(event.target.value)}} 
            value={this.name}
            type="text"
            className="form-control">
        </input>
        <input 
            onChange={(event) => {this.setPhone(event.target.value)}} 
            value={this.phone}
            type="text"
            className="form-control">
        </input>
        <button onClick={this.handleCreate} type="button" className="btn btn-outline-primary mt-3">입력</button>
        <PhoneInfoList data={this.state.information}/>
      </div>
    );
  }
}

export default VersionList;