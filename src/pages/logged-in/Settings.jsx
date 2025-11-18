import ContentSettings from "../../features/Settings/components/ContentSettings";
import HeadSettings from "../../features/Settings/components/HeadSettings";

function Settings() {
  return (
    <div className="max-w-4xl mx-auto ">
      <div className="mx-4">
        <div className="mb-6">
          <HeadSettings />
        </div>
        <div>
          <ContentSettings />
        </div>
      </div>
    </div>
  );
}

export default Settings;
