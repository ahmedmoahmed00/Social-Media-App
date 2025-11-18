import useUserData from "../../../hooks/queryHooks/useUserData";
import SettingPersonalInformationSection from "./sections/SettingPersonalInformationSection";
import SettingProfileImagesSection from "./sections/SettingProfileInformationSection";
import SettingSecuritySection from "./sections/SettingSecuritySection";
import SignOutSection from "./sections/SignOutSection";

function ContentSettings() {
  const user = useUserData();

  const containerClass =
    "max-md:p-4 p-6  border border-primary dark:border-dark-primary rounded-lg";

  return (
    <div className="flex flex-col gap-6   pb-15">
      <div className={containerClass}>
        <SettingProfileImagesSection user={user} />
      </div>
      <div className={containerClass}>
        <SettingPersonalInformationSection user={user} />
      </div>
      <div className={containerClass}>
        <SettingSecuritySection user={user} />
      </div>
      <div className={containerClass}>
        <SignOutSection />
      </div>
    </div>
  );
}

export default ContentSettings;
