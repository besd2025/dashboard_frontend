import UserAddressCard from "../../../../ui/municipal/cultivators/profile/user-profile/UserAddressCard";
import UserInfoCard from "../../../../ui/municipal/cultivators/profile/user-profile/UserInfoCard";
import UserMetaCard from "../../../../ui/municipal/cultivators/profile/user-profile/UserMetaCard";
import React from "react";

function Page({ searchParams }) {
  const cultId = searchParams?.cult_id;
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard cultivateur_id={cultId} />
          <UserInfoCard cultivateur_id={cultId} />
          <UserAddressCard cultivateur_id={cultId} />
        </div>
      </div>
    </div>
  );
}

export default Page;
