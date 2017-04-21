
import React from 'react';
import ReactSWF from 'react-swf';

const SWF_ID_PREFIX = '__MyExternalInterfaceExample_SWFID_';
const SWF_CALL_NAME_PREFIX = '__MyExternalInterfaceExample_SWFCall_';

let nextUID = 0;

class CloudAnimation extends React.Component {
  constructor(props) {
    super(props);
    console.log("in CloudAnimation")
    // For most purposes nextUID is sufficient. However, if you rely on
    // non-trivial server rendering you must generate deterministic UIDs per
    // React root to avoid markup mismatch.
    this._uid = nextUID++;

    window[SWF_CALL_NAME_PREFIX + this._uid] = this.handleSWFCall.bind(this);
  }

  componentWillUnmount() {
    delete window[SWF_CALL_NAME_PREFIX + this._uid];
  }

  handleSWFCall() {
    // Beware; SWF calls are executed in the context of SWF Player.
    console.log('SWFCall', arguments);
    return 'foobar';
  }

  invokeSWFMyCallback(arg) {
    // Beware; SWF Player does not sufficiently escape serialized arguments.
    return this._swfPlayerNode.myCallback(arg);
  }

  render() {
    // Globally unique ID is required for ExternalInterface callbacks in IE<11.
    return (
      <ReactSWF
          src={'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cloudAnimation.swf'}
          name={'cloud'}
          width={100}
          height={100}
          wmode={'transparent'}
          play={false}
          menu={false}

        ref={c => this._swfPlayerNode = c}
        id={SWF_ID_PREFIX + this._uid}
        flashVars={{myCallbackName: SWF_CALL_NAME_PREFIX + this._uid}}
      />
    );
  }
}

export default CloudAnimation