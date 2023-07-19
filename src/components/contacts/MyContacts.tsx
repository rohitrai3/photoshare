import { useEffect, useState } from "react";
import { getConnectedUsersOnUpdate } from "../../services/database";
import { UserInfo } from "../../common/types";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";
import { NextIcon } from "../../common/icons";
import { useNavigate } from "react-router-dom";

export default function MyContacts() {
  const userUsername = useAppSelector(selectUsername);
  const [connectedUsers, setConnectedUsers] = useState<UserInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getConnectedUsersOnUpdate(userUsername, setConnectedUsers);
  }, [userUsername]);

  return (
    <div className="my-contacts">
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
            <div
              className="contacts-buttons primary"
              onClick={() =>
                navigate("/contacts/view", {
                  state: {
                    username: user.username,
                  },
                })
              }
            >
              {NextIcon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
