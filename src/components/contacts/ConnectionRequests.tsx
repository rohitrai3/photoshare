import { useEffect, useState } from "react";
import { SpinnerIcon, TickIcon } from "../../common/icons";
import {
  getConnectionRequestsOnUpdate,
  removeConnectionRequest,
  saveContact,
} from "../../services/database";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";
import { UserInfo } from "../../common/types";

export default function ConnectionRequests() {
  const [connectionRequests, setConnectionRequests] = useState<UserInfo[]>([]);
  const [connectionRequestsCount, setConnectionRequestsCount] = useState(0);
  const userUsername = useAppSelector(selectUsername);
  const [isAcceptingConnectionRequest, setIsAcceptingConnectionRequest] =
    useState(false);

  const acceptConnectionRequest = async (username: string) => {
    setIsAcceptingConnectionRequest(true);
    await saveContact(userUsername, username);
    await saveContact(username, userUsername);
    await removeConnectionRequest(userUsername, username);
    loadConnectionRequests();
    setIsAcceptingConnectionRequest(false);
  };

  const acceptConnectionRequestButton = (username: string) => {
    return (
      <button
        className="contacts-buttons primary"
        onClick={() => acceptConnectionRequest(username)}
      >
        {TickIcon}
      </button>
    );
  };

  const showAcceptConnectionRequestButton = (username: string) => {
    return isAcceptingConnectionRequest
      ? SpinnerIcon
      : acceptConnectionRequestButton(username);
  };

  const loadConnectionRequests = () => {
    getConnectionRequestsOnUpdate(userUsername, setConnectionRequests);
  };

  useEffect(() => {
    loadConnectionRequests();
  }, []);

  useEffect(() => {
    setConnectionRequestsCount(
      connectionRequests ? connectionRequests.length : 0
    );
  }, [connectionRequests]);

  return (
    <div className="connection-requests">
      <div className="connection-requests-label on-surface-variant-text title-small">
        Incoming connection requests ({connectionRequestsCount})
      </div>
      <div className="connection-requests-list">
        {connectionRequests.map((request) => (
          <div className="connection-request" key={request.username}>
            <div className="user-info">
              <img src={request.photoUrl} />
              <div className="user-info-name">
                <div className="user-name headline-small">{request.name}</div>
                <div className="user-username label-medium">
                  @{request.username}
                </div>
              </div>
            </div>
            {showAcceptConnectionRequestButton(request.username)}
          </div>
        ))}
      </div>
    </div>
  );
}
