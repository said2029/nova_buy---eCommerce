import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import About_Us from "@/components/dashboard/storeCustomizations/About_Us";
import CheckoutSetting from "@/components/dashboard/storeCustomizations/Checkout";
import ContactUs from "@/components/dashboard/storeCustomizations/ContactUs";
import FAQs from "@/components/dashboard/storeCustomizations/FAQs";
import HomeSetting from "@/components/dashboard/storeCustomizations/HomeSetting";
import Privacy_Policy_and_TC from "@/components/dashboard/storeCustomizations/Privacy Policy and T&C";
import SEOSettingsPage from "@/components/dashboard/storeCustomizations/SEO_Setting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <MainProviderPerants name="Store Customizations">
      <Tabs defaultValue="HomeSetting">
        <TabsList className="flex gap-2 flex-wrap items-center min-h-16 h-fit">
          <TabsTrigger
            defaultChecked
            className="h-12 bg-gray-200/10 rounded-md"
            value="HomeSetting"
          >
            HomeSetting
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="About US"
          >
            About US
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="FAQs"
          >
            FAQs
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Privacy_Policy_and_TC"
          >
           Privacy_Policy_and_TC
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="ContactUs"
          >
            ContactUs
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Checkout"
          >
            Checkout
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="SEOSettings"
          >
            SEO Setting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="HomeSetting">
          <HomeSetting />
        </TabsContent>
        <TabsContent value="About US">
          <About_Us />
        </TabsContent>
        <TabsContent value="FAQs"><FAQs/></TabsContent>
        <TabsContent value="Privacy_Policy_and_TC"><Privacy_Policy_and_TC/></TabsContent>
        <TabsContent value="ContactUs"><ContactUs/></TabsContent>
        <TabsContent value="Checkout"><CheckoutSetting/></TabsContent>
        <TabsContent value="SEOSettings"><SEOSettingsPage/></TabsContent>
      </Tabs>
    </MainProviderPerants>
  );
}
