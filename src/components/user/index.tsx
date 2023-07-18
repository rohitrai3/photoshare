import { NavigationSection } from "../../common/enums";
import { SpinnerIcon } from "../../common/icons";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";
import Navigation, { NavigationProps } from "../navigation";
import UserFooter from "./UserFooter";
import ViewUser, { ViewUserProps } from "./view";

export default function User() {
  const navigationProps: NavigationProps = {
    activeNavigationSection: NavigationSection.USER,
  };
  const userUsername = useAppSelector(selectUsername);
  const viewUserProps: ViewUserProps = {
    username: userUsername,
  };

  const showViewUser = () => {
    if (userUsername.length === 0) {
      return SpinnerIcon;
    } else {
      return <ViewUser {...viewUserProps} />;
    }
  };

  return (
    <div className="user background on-background-text">
      {showViewUser()}
      <UserFooter />
      <Navigation {...navigationProps} />
    </div>
  );
}
