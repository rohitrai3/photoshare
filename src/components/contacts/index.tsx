import { useState } from "react";
import { ContactTab, NavigationSection } from "../../common/enums";
import Navigation, { NavigationProps } from "../navigation";
import { TickIcon } from "../../common/icons";
import MyContacts from "./MyContacts";
import AddContacts from "./AddContacts";

export default function Contacts() {
  const navigationProps: NavigationProps = {
    activeNavigationSection: NavigationSection.CONTACTS,
  };
  const [activeTab, setActiveTab] = useState(ContactTab.MY);

  const showSelectionIcon = (tab: ContactTab) => {
    if (tab === activeTab) {
      return TickIcon;
    }
  };

  const getActiveTabStyle = (tab: ContactTab) => {
    return tab === activeTab
      ? "secondary-container on-secondary-container-text"
      : "surface on-surface-text";
  };

  const showTabContent = () => {
    return activeTab === ContactTab.MY ? <MyContacts /> : <AddContacts />;
  };

  return (
    <div className="contacts background">
      <div className="contacts-panel primary-container on-primary-container-text">
        <div className="contacts-tabs label-large">
          <div
            className={`contacts-tabs-label my-contacts-label ${getActiveTabStyle(
              ContactTab.MY
            )}`}
            onClick={() => setActiveTab(ContactTab.MY)}
          >
            {showSelectionIcon(ContactTab.MY)}My
          </div>
          <div
            className={`contacts-tabs-label add-contacts-label ${getActiveTabStyle(
              ContactTab.ADD
            )}`}
            onClick={() => setActiveTab(ContactTab.ADD)}
          >
            {showSelectionIcon(ContactTab.ADD)}Add
          </div>
        </div>
        {showTabContent()}
      </div>
      <Navigation {...navigationProps} />
    </div>
  );
}
