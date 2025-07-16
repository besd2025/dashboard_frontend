import Profile from "../../../../ui/municipal/hangars/details/profile";

function layout({ children }) {
  return (
    <div>
      <Profile />
      <div className="bg-white dark:bg-white/[0.03]  mt-2 rounded-2xl mb-1">
        <div className="shadow-xl">{children}</div>
      </div>
    </div>
  );
}

export default layout;
