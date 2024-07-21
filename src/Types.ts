//#region Home Setting

import * as z from "zod";

const HomeSettingSchema = z.object({
  headerText: z.string(),
  phoneNumber: z.string(),
  headerLogoImage: z.string(),
  categories: z.string(),
  aboutUs: z.string(),
  contactUs: z.string(),
  offers: z.string(),
  faq: z.string(),
  privacyPolicy: z.string(),
  termsAndConditions: z.string(),
  pages: z.string(),
  myAccount: z.string(),
  login: z.string(),
  logout: z.string(),
  checkout: z.string(),
  sliderHero: z.array(
    z.object({
      sliderImages: z.string(),
      sliderTitle: z.string(),
      sliderDescription: z.string(),
      sliderButtonName: z.string(),
      sliderButtonLink: z.string(),
    }),
  ),
  superDiscountCouponIsActive: z.string(),
  superDiscountCouponsCode: z.array(z.string()),
  superDiscountTitle: z.string(),

  promotionBannerIsActive: z.string(),
  promotionBannerTitle: z.string(),
  promotionBannerDescription: z.string(),
  promotionBannerButtonName: z.string(),
  promotionBannerButtonLink: z.string(),

  popularProductsIsActive:z.string(),
  popularProductsDiscriotion: z.string(),
  popularProductsTitle: z.string(),
  popularProductsProductsLimit: z.string(),

  quickDeliveryIsActive: z.string(),
  quickDeliverySectionSubTitle: z.string(),
  quickDeliverySectionTitle: z.string(),
  quickDeliverySectionDescription: z.string(),
  quickDeliverySectionButtonName: z.string(),
  quickDeliverySectionButtonLink: z.string(),
  quickDeliverySectionImage: z.string(),

  latestDiscountedProductsIsActive:z.string(),
  latestDiscountedProductsTitle: z.string(),
  latestDiscountedProductsDescription: z.string(),
  latestDiscountedProductsLimit: z.string(),

  getYourDailyNeedsIsActive: z.string(),
  getYourDailyNeedsTitle: z.string(),
  getYourDailyNeedsDescription: z.string(),
  getYourDailyNeedsTitleImageLeft: z.string(),
  getYourDailyNeedsTitleImageRight: z.string(),
  getYourDailyNeedsTitleButton1Image: z.string(),
  getYourDailyNeedsTitleButton1Link: z.string(),
  getYourDailyNeedsTitleButton2Image: z.string(),
  getYourDailyNeedsTitleButton2Link: z.string(),

  featurePromoIsActive: z.string(),
  featurePromoSectionFreeShipping: z.string(),
  featurePromoSectionSupport: z.string(),
  featurePromoSectionSecurePayment: z.string(),
  featurePromoSectionLatestOffer: z.string(),

  footerBlocks: z.array(
    z.object({
      active: z.string(),
      title: z.string(),
      link1: z.string(),
      link2: z.string(),
      link3: z.string(),
      link4: z.string(),
    })
  ),
  footerBlock: z.object({
    active: z.string(),
    footerLogo: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    socialLinks: z.object({
      active: z.string(),
      facebook: z.string(),
      twitter: z.string(),
      pinterest: z.string(),
      linkedin: z.string(),
      whatsApp: z.string(),
    }),
  }),
  paymentMethodActive: z.string(),
  paymentMethodImage: z.string(),
  footerBottomContactActive: z.string(),
  footerBottomContactNumber: z.string(),
});

const A_P_SettingSchema = z.object({
  aboutUs: z.string(),
  privacyPolicy: z.string(),
  terms_conditions: z.string(),
});

const Check_outSchema = z.object({
  apply_button: z.string(),
  checkout_phone: z.string(),
  city: z.string(),
  confirm_button: z.string(),
  continue_button: z.string(),
  country: z.string(),
  discount: z.string(),
  email_address: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  order_summary: z.string(),
  payment_method: z.string(),
  personal_details: z.string(),
  shipping_cost: z.string(),
  shipping_details: z.string(),
  shipping_name_one: z.string(),
  shipping_name_two: z.string(),
  shipping_one_cost: z.string(),
  shipping_one_desc: z.string(),
  shipping_two_cost: z.string(),
  shipping_two_desc: z.string(),
  street_address: z.string(),
  sub_total: z.string(),
  total_cost: z.string(),
  zip_code: z.string(),
  Shipping_Methods_one_name: z.string(),
  Shipping_Methods_one_delivery: z.string(),
  Shipping_Methods_one_cost: z.string(),
  Shipping_Methods_one_price: z.string(),
  Shipping_Methods_two_name: z.string(),
  Shipping_Methods_two_delivery: z.string(),
  Shipping_Methods_two_cost: z.string(),
  Shipping_Methods_two_price: z.string(),
});

const ContactUS_SettingSchema = z.object({
  address_box_address_one: z.string(),
  address_box_title: z.string(),
  callUs_box_phone: z.string(),
  callUs_box_text: z.string(),
  callUs_box_title: z.string(),
  checked_Address_Box: z.string(),
  checked_CallBox: z.string(),
  checked_Contact_Form: z.string(),
  checked_EmailBox: z.string(),
  checked_Middle_Left_Colum: z.string(),
  checked_bg_Hero: z.string(),
  contact_form_description: z.string(),
  contact_form_title: z.string(),
  contact_page_title: z.string(),
  email_box_email: z.string(),
  email_box_text: z.string(),
  email_box_title: z.string(),
  header_background_image: z.string(),
  middle_left_colum_Image: z.string(),
});

const FAQs_SettingSchema = z.object({
  FAQs_Left_Column_Image: z.string(),
  FAQs_Left_Column_checked: z.string(),
  FAQs_Page_Header_checkbox: z.string(),
  FAQs_checked: z.string(),
  FAQs_header_background_image: z.string(),
  faq_description_eight: z.string(),
  faq_description_five: z.string(),
  faq_description_four: z.string(),
  faq_description_one: z.string(),
  faq_description_seven: z.string(),
  faq_description_six: z.string(),
  faq_description_three: z.string(),
  faq_description_two: z.string(),
  faq_page_title: z.string(),
  faq_title_eight: z.string(),
  faq_title_five: z.string(),
  faq_title_four: z.string(),
  faq_title_one: z.string(),
  faq_title_seven: z.string(),
  faq_title_six: z.string(),
  faq_title_three: z.string(),
  faq_title_two: z.string(),
});

const Seo_SettingSchema = z.object({
  SeoSetting_tital: z.string(),
  SeoSetting_Description: z.string(),
  SeoSetting_Kaywords: z.string(),
  SeoSetting_url: z.string(),
  SeoSetting_image: z.string(),
});

const StoreSettingSchema = z.object({
  Home_Setting: HomeSettingSchema,
  A_P_Setting: A_P_SettingSchema,
  Check_out: Check_outSchema,
  ContactUS_Setting: ContactUS_SettingSchema,
  FAQs_Setting: FAQs_SettingSchema,
  Seo_Setting: Seo_SettingSchema,
});



export {
  StoreSettingSchema,
  Seo_SettingSchema,
  HomeSettingSchema,
  A_P_SettingSchema,
  ContactUS_SettingSchema,
  FAQs_SettingSchema,
  Check_outSchema,
};

//#endregion
