import { useLocation } from "react-router-dom";
import Navigation, { NavigationProps } from "../../navigation";
import { NavigationSection } from "../../../common/enums";
import ViewUser, { ViewUserProps } from "../../user/view";

export default function ViewContact() {
  const location = useLocation();
  const username = location.state.username;
  const navigationProps: NavigationProps = {
    activeNavigationSection: NavigationSection.CONTACTS,
  };
  const viewUserProps: ViewUserProps = {
    username: username,
  };

  return (
    <div className="view-contact background on-background-text">
      <ViewUser {...viewUserProps} />
      <Navigation {...navigationProps} />
    </div>
  );
}
