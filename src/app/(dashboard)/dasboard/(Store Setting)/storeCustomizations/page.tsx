import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import HomeSetting from "@/components/dashboard/storeCustomizations/HomeSetting";
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
            value="PrivacyPolicy"
          >
            PrivacyPolicy
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="About US"
          >
            About US
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Terms Conditions"
          >
            Terms Condition
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Payment"
          >
            Payment
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="Contact US"
          >
            Contact US
          </TabsTrigger>
          <TabsTrigger className="h-12 bg-gray-200/10 rounded-md" value="FAQs">
            FAQs
          </TabsTrigger>
          <TabsTrigger
            className="h-12 bg-gray-200/10 rounded-md"
            value="SEO Setting"
          >
            SEO Setting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="HomeSetting">
          <HomeSetting />
        </TabsContent>
        <TabsContent value="PrivacyPolicy">Privacy Policy Content</TabsContent>
        <TabsContent value="About US">About US Content</TabsContent>
        <TabsContent value="Terms Conditions">
          Terms Conditions Content
        </TabsContent>
        <TabsContent value="Payment">Payment Content</TabsContent>
        <TabsContent value="Contact US">Contact US Content</TabsContent>
        <TabsContent value="FAQs">FAQs Content</TabsContent>
        <TabsContent value="SEO Setting">SEO Setting Content</TabsContent>
      </Tabs>
    </MainProviderPerants>
  );
}
