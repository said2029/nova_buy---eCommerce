import { Setting_Store_Get } from "@/Actions/quires";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import FormSetting_Store from "./_components/FormSetting_Store";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("StoreSetting");

  const Defualt = await Setting_Store_Get();

  return (
    <MainProviderPerants name={t("Store Setting")}>
      <section className="px-10 lg:px-40 py-9 bg-gray-400/10 rounded-md">
        <FormSetting_Store defaultData={Defualt} />
      </section>
    </MainProviderPerants>
  );
}
