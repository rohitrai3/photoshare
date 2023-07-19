import { useState } from "react";
import { SearchIcon, SpinnerIcon, TickIcon } from "../../common/icons";
import { UserInfo } from "../../common/types";
import {
  getConnectedUsers,
  getUserInfo,
  saveConnectionRequest,
} from "../../services/database";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";
import ConnectionRequests from "./ConnectionRequests";

export default function AddContacts() {
  const [searchUsername, setSearchUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedUser, setSearchedUser] = useState<UserInfo>();
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [isSendingConnectionRequest, setIsSendingConnectionRequest] =
    useState(false);
  const userUsername = useAppSelector(selectUsername);
  const isDisable = searchUsername.length === 0;

  const getDisableStyle = () => {
    if (isDisable) {
      return "disable-button";
    }
  };

  const checkIsUserConnected = async () => {
    const connectedUsers = await getConnectedUsers(userUsername);
    setIsUserConnected(connectedUsers.includes(searchUsername));
  };

  const searchContact = async () => {
    setIsSearching(true);
    const user = await getUserInfo(searchUsername);
    setSearchedUser(user);
    await checkIsUserConnected();
    setSearchUsername("");
    setIsSearching(false);
  };

  const searchButton = (
    <button
      className={`contacts-buttons primary ${getDisableStyle()}`}
      onClick={() => searchContact()}
      disabled={isDisable}
      id="searchContactButton"
    >
      {SearchIcon}
    </button>
  );

  const showSearchButton = () => {
    return isSearching ? SpinnerIcon : searchButton;
  };

  const sendConnectionRequest = async () => {
    setIsSendingConnectionRequest(true);
    await saveConnectionRequest(userUsername, searchedUser?.username!);
    setIsUserConnected(true);
    setIsSendingConnectionRequest(false);
  };

  const sendConnectionRequestButton = (
    <div
      className="contacts-buttons secondary"
      onClick={() => sendConnectionRequest()}
    >
      {TickIcon}
    </div>
  );

  const showSendConnectionRequestButton = () => {
    if (!isUserConnected) {
      return isSendingConnectionRequest
        ? SpinnerIcon
        : sendConnectionRequestButton;
    }
  };

  const showSearchedContact = () => {
    if (searchedUser) {
      return (
        <div className="searched-contact">
          <div className="user-info">
            <img src={searchedUser.photoUrl} />
            <div className="user-info-name">
              <div className="user-name headline-small">
                {searchedUser.name}
              </div>
              <div className="user-username label-medium">
                @{searchedUser.username}
              </div>
            </div>
          </div>
          {showSendConnectionRequestButton()}
        </div>
      );
    }
  };

  document.onkeydown = (event) => {
    if (event.key === "Enter") {
      (
        document.getElementById("searchContactButton") as HTMLButtonElement
      ).click();
    }
  };

  return (
    <div className="add-contacts">
      <div className="search-contact">
        <input
          className="secondary-container on-secondary-container-text body-large"
          type="text"
          placeholder="Enter username"
          value={searchUsername}
          onChange={(event) =>
            setSearchUsername(event.target.value.trim().toLowerCase())
          }
        />
        {showSearchButton()}
      </div>
      {showSearchedContact()}
      <ConnectionRequests />
    </div>
  );
}
