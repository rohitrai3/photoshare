import { useEffect, useState } from "react";
import { getConnectedUsersOnUpdate } from "../../services/database";
import { UserInfo } from "../../common/types";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";
import { SpinnerIcon } from "../../common/icons";

export default function MyContacts() {
  const [isLoadingConnectedUsers, setIsLoadingConnectedUsers] = useState(true);
  const userUsername = useAppSelector(selectUsername);
  const [connectedUsers, setConnectedUsers] = useState<UserInfo[]>([]);

  const showConnectedUsers = () => {
    if (isLoadingConnectedUsers) {
      return SpinnerIcon;
    } else {
      return (
        <div className="my-contacts-list">
          {connectedUsers.map((user) => (
            <div className="contact" key={user.username}>
              <div className="user-info">
                <img src={user.photoUrl} />
                <div className="user-info-name">
                  <div className="user-name headline-small">{user.name}</div>
                  <div className="user-username label-medium">
                    @{user.username}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const loadConnectedUsers = async () => {
    setIsLoadingConnectedUsers(true);
    await getConnectedUsersOnUpdate(userUsername, setConnectedUsers);
    setIsLoadingConnectedUsers(false);
  };

  useEffect(() => {
    loadConnectedUsers();
  }, []);

  return <div className="my-contacts">{showConnectedUsers()}</div>;
}
