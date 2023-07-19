export type ViewUserHeaderProps = {
  username: string;
  name: string;
  photoUrl: string;
};

export default function ViewUserHeader({
  username,
  name,
  photoUrl,
}: ViewUserHeaderProps) {
  return (
    <div className="user-header">
      <img src={photoUrl} />
      <div className="user-header-name">
        <div className="display-medium">{name}</div>
        <div className="label-large">@{username}</div>
      </div>
    </div>
  );
}
