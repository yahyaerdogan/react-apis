import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";
import './api-item.scss'

const ApiItem = ({data: api, toggleBookmark}) => {
  return (
    <div className="api-item">
      <div className="item-icon">
        <img src={api.icon} />
      </div>
      <div className="item-detail">
        <h4>{api.name}</h4>
        <div className="item-category">{api.category}</div>
        <div className="item-description">{api.description}</div>
      </div>
      <div className="item-hover">
        <button onClick={() => toggleBookmark(api.id)}>
          {api.bookmark ? <BsBookmarkFill /> : <BsBookmark />}
          Bookmark
        </button>
        <a href={api.docs_url} target="_blank">
          API Docs
          <RiArrowRightSLine />
        </a>
      </div>
    </div>
  );
};

export default ApiItem;
