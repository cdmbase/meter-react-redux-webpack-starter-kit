import React, { PropTypes } from 'react';


const ButtonGroup = ({ menus, onButtonsClick }) => (
  <div id={menus.id()}>
    {menus.children().map((item, i) => (
      <button
        id={item.id()}
        key={i}
        className="button pin-button bubble--right"
        onClick={() => onButtonsClick(item.action())}
      >
        <div className="icon">
          <div className="icon-img-container" />
        </div>
      </button>
    ))}
  </div>
);

ButtonGroup.propTypes = {
  menus: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.func.isRequired,
    uuid: PropTypes.number,
    id: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.func.isRequired,
      action: PropTypes.func.isRequired,
    }).isRequired).isRequired,
  }).isRequired).isRequired,
  onButtonsClick: PropTypes.func.isRequired,
};

export default ButtonGroup;
