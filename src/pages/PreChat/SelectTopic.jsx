import { Link } from 'react-router-dom';

const SelectTopic = () => {
  return (
    <div>
      Select Topic
      <div>
        <Link to="/chat">Start Chat</Link>
      </div>
    </div>
  );
};

export default SelectTopic;
