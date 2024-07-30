import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { getTranslations } from "next-intl/server";
import FormGlobalSetting from "./_components/FormGlobalSetting";
import { Global_Setting_Get } from "@/Actions/quires";

export default async function page() {
  const t = await getTranslations("SettingPage");
  const defualtData = await Global_Setting_Get();

  return (
    <MainProviderPerants name={t("Setting")}>
      <section className="bg-gray-400/10 p-3 rounded-md md:px-10 lg:px-48 ">
        <FormGlobalSetting defualtData={defualtData} />
      </section>
    </MainProviderPerants>
  );
}
