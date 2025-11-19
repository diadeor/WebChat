import { Link } from "react-router-dom";

const ChatProfile = ({ img, name, sub }: { img: string; name: string; sub: string }) => {
  return (
    <Link to={`/app/chat`}>
      <div className="profile flex flex-row p-2 text-white gap-3">
        <img src={img} alt="" className="h-12 rounded-full aspect-square" />
        <div className="info font-poppins flex flex-col">
          <p className="name font-bold text-lg">{name}</p>
          <p className="last-msg text-sm">{sub}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatProfile;
