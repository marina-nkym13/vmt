import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classes from './tabs.css';

const Tabs = ({
  tabs,
  currentTabId,
  ntfTabs,
  onChangeTab,
  onCreateNewTab,
  canCreate,
}) => {
  // @TODO worry about edge cases

  let currentSelection;
  const tabOptions = tabs
    .map((tab, i) => {
      const currentOption = { label: `(${i + 1}) ${tab.name}`, value: tab._id };
      // the option associated with currentTabId
      if (tab._id === currentTabId) currentSelection = currentOption;
      return currentOption;
    })
    .filter((tab) => tab.value !== currentTabId);

  return (
    <div className={classes.TabsContainer} data-testid="tabs-container">
      <Select
        options={tabOptions}
        onChange={(selectedOption) => onChangeTab(selectedOption.value)}
        value={{ ...currentSelection, label: `Tab: ${currentSelection.label}` }}
        isSearchable={false}
        styles={{
          menu: (base) => ({
            ...base,
            marginTop: 0,
          }),
        }}
      />
      {canCreate ? (
        <div className={[classes.Tab, classes.NewTab].join(' ')}>
          <div
            onClick={onCreateNewTab}
            onKeyDown={onCreateNewTab}
            role="button"
            tabIndex="-3"
            className={classes.TabBox}
          >
            <i data-testid="add-tab" className="fas fa-plus" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  canCreate: PropTypes.bool,
  currentTabId: PropTypes.string.isRequired,
  ntfTabs: PropTypes.arrayOf(PropTypes.shape({})),
  onChangeTab: PropTypes.func,
  onCreateNewTab: (props, propName) => {
    if (props.canCreate && !props[propName]) {
      throw new Error(
        'if participants can create tabs, a create tab function must be provided'
      );
    }
  },
};

Tabs.defaultProps = {
  onChangeTab: () => {},
  onCreateNewTab: () => {},
  ntfTabs: [],
  canCreate: false,
};

export default Tabs;