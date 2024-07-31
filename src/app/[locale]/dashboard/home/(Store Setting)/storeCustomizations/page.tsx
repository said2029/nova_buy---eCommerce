import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import About_Us from "@/components/dashboard/storeCustomizations/About_Us";
import CheckoutSetting from "@/components/dashboard/storeCustomizations/Checkout";
import ContactUs from "@/components/dashboard/storeCustomizations/ContactUs";
import FAQs from "@/components/dashboard/storeCustomizations/FAQs";
import HomeSetting from "@/components/dashboard/storeCustomizations/HomeSetting";
import Privacy_Policy_and_TC from "@/components/dashboard/storeCustomizations/Privacy Policy and T&C";
import SEOSettingsPage from "@/components/dashboard/storeCustomizations/SEO_Setting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fetch from "@/lib/axios/AxiosClient";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("storeCustomizations");
  let HomeSettingData:any = {};

  try {
    HomeSettingData = await Fetch.get("/store_customiza");
  } catch (error: any) {
    console.log(error?.message);
  }

  return (
    <MainProviderPerants name={t("Store Customizations")}>
      <Tabs defaultValue="HomeSetting">
        <TabsList className="flex gap-2 flex-wrap items-center min-h-16 h-fit">
          <TabsTrigger
            defaultChecked
            className="h-12 bg-gray-200/10 rounded-md"
            value="HomeSetting"
          >
            {t("HomeSetting")}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="About US"
          >
            {t("About US")}
          </TabsTrigger>
          <TabsTrigger className="h-12 bg-gray-200/10 rounded-md" value="FAQs">
            {t("FAQs")}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Privacy_Policy_and_TC"
          >
            {t("Privacy Policy and T&C")}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="ContactUs"
          >
            {t("ContactUs")}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Checkout"
          >
            {t("Checkout")}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="SEOSettings"
          >
            {t("SEO Setting")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="HomeSetting">
          <HomeSetting defaultData={HomeSettingData?.HomeSetting}/>
        </TabsContent>
        <TabsContent value="About US">
          <About_Us defaultData={HomeSettingData?.AboutUsSchema}/>
        </TabsContent>
        <TabsContent value="FAQs">
          <FAQs defaultData={HomeSettingData?.FaqsSchema}/>
        </TabsContent>
        <TabsContent value="Privacy_Policy_and_TC">
          <Privacy_Policy_and_TC defaultData={HomeSettingData?.PrivacyTCSchema}/>
        </TabsContent>
        <TabsContent value="ContactUs">
          <ContactUs defaultData={HomeSettingData?.ContactUsSchema}/>
        </TabsContent>
        <TabsContent value="Checkout">
          <CheckoutSetting defaultData={HomeSettingData?.CheckoutSchema}/>
        </TabsContent>
        <TabsContent value="SEOSettings">
          <SEOSettingsPage defaultData={HomeSettingData?.SEOSchema}/>
        </TabsContent>
      </Tabs>
    </MainProviderPerants>
  );
}
