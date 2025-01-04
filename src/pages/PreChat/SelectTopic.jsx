import { Link } from 'react-router-dom';

const SelectTopic = () => {
  return (
    <div>
      Select Topic:
      <Link to="/chat">Start Chat</Link>
    </div>
  );
};

export default SelectTopic;
