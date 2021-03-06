import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Transport from './Transport.jsx';
import EffectsRack from './EffectsRack.jsx';
import Sampler from './Sampler.jsx';
import Synth from './Synth.jsx';
import Fader from './Fader.jsx';
import io from 'socket.io-client';

let socket = io();

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

 componentDidMount(){
   let context = this;
   socket.emit('playerLoading');
   socket.on('userLogin', function(data) {
     window.localStorage.setItem('com.rejuicy.user',JSON.stringify({
       username: data.data.username
     }));
     context.props.dispatch({type:'USER_LOGIN'});
     context.forceUpdate()
    })
  }

  render() {
    return (
      <div className="player" style={{paddingLeft:'1%', paddingRight:'1%', height: '100%', maxWidth:'1200px', display:'block',marginLeft:'auto',marginRight:'auto'}}>
        <div style={{width: '100%', height: '4em'}}></div>
        <Transport />
        <Sampler />
        <EffectsRack />
        <Synth />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);
