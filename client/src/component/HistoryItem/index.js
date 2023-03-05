import './style.css';
import {ReactComponent as Arrow} from '../../asset/icon/arrow.svg';

function HistoryItem(props) {
  return (
    <div className="item-wrapper">
      <div className="item-query">
        {props.query}
      </div>    
      <Arrow />
    </div>
  );
}

export default HistoryItem;
