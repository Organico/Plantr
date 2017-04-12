import React from 'react';
import sizeMe from 'react-sizeme';

const { PropTypes } = React;

class ExampleBase extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
}

export default ExampleBase;
// export default sizeMe({ monitorHeight: true, refreshRate: 200 })(ExampleBase);
